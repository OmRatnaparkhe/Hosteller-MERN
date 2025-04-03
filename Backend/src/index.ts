
import JWT from 'jsonwebtoken';
import { OtpModel,UserModel,RoomsModel, SupportModel } from "./db";
import bodyParser from "body-parser"
import { userMiddleware } from "./middleware";
import express, { Request, Response } from "express";
import multer from "multer";
import { connectDB, gfs, gridfsBucket } from "./db";
import cors from "cors";
import { GridFSBucketWriteStream } from "mongodb";
import { error } from 'console';
const JWT_PASSWORD = "12334234"
const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())
//connect to MongoDB
connectDB();


app.post("/contactUs",async(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
try{
    await SupportModel.create({
        name:name,
        email:email,
        message:message
    })

}
catch(error){
    res.json({message:"Request Failed!",error})
}
   
})
app.post("/signup",async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
   
     try{
        await OtpModel.create({
            email,
            password,
           
        })
        
            res.json({
                message:"Signed up successfully!"
            })
     }catch(e){

        res.status(411).json({
            message:"Incorrect Number",error
        })
  
     }   
        
    
})

app.post("/signin",userMiddleware,async (req,res)=>{
    const email = req.body.email;
    console.log(email)
    const existingUser = await UserModel.findOne({
        email
    })
    if (!existingUser) {
        res.status(401).json({ error: "User not found" });
        return
    }
    res.json({
        existingUser
    })
    
})


app.post("/userInfo",async(req,res)=>{
    const { username, mobileNo, email, college, type, password } = req.body;
    const existingOtpUser = await OtpModel.findOne({ email, password });
    if(!existingOtpUser) {
        res.status(403).json({ message: "Incorrect Email or Password" });
        return;}
    
      let user = await UserModel.findOne({ email });

      if (user) {
        const token = JWT.sign({ id: user._id }, JWT_PASSWORD);
        res.json({ message: "User already exists", token, user });
        return;
      }
      user = new UserModel({
        username,
        mobileNo,
        email,
        college,
        type,
        password,
        userId: existingOtpUser._id,
    });

    await user.save();
    const token = JWT.sign({ id: user._id }, JWT_PASSWORD);

    res.json({
        message: "Profile Created",
        token,
        user
    });
    return;

})

app.get("/getUserInfo",userMiddleware,async(req,res)=>{
    //@ts-ignore
    const userId = req.userId;
    const userInfo = await UserModel.findOne({
        //@ts-ignore
        _id: req.userId
    })

    res.json({
        userInfo,
        userId
    })
})

//Upload Room with Image
const storage = multer.memoryStorage();
const upload = multer({ storage }).array("images",5);

// ✅ Upload Room with Image
app.post("/rooms", upload,userMiddleware, async (req: Request, res: Response):Promise<void> => {
    try {
        const { address, rent, members, contact, city } = req.body;
        const files = req.files as Express.Multer.File[]
        //@ts-ignore
        const userId = req.userId;
        if (!files) {
            res.status(400).json({ error: "No file uploaded" });
            return
        }

        if (!gridfsBucket) {
            console.error("GridFS is not initialized.");
            res.status(500).json({ error: "GridFS is not initialized" });
            return;
        }
        let filenames:string[] = [];
        // Manually write the file to GridFS
       files.forEach((file)=>{ 
        const filename = `${Date.now()}-${file.originalname}`;
        filenames.push(filename)
        const uploadStream: GridFSBucketWriteStream = gridfsBucket!.openUploadStream(filename);
        uploadStream.end(file.buffer);}) // Write file buffer to GridFS

        
            const newRoom = new RoomsModel({
                address,
                rent,
                members,
                contact,
                city,
                imageFilenames: filenames, // Store filename in MongoDB
                userId
            });

            await newRoom.save();
            res.status(201).json({ message: "Room added successfully!", room: newRoom });

    } catch (error) {
        console.error("Error adding room:", error);
       res.status(500).json({ error: "Failed to add room" });
       return 
    }
});
// ✅ Retrieve Images
app.get("/images/:filename", async (req: Request, res: Response): Promise<void> => {
    try {
        if (!gfs || !gridfsBucket) {
            res.status(500).json({ error: "GridFS is not initialized" });
            return;
        }

        const file = await gfs.files.findOne({ filename: req.params.filename });

        if (!file || file.length === 0) {
            res.status(404).json({ error: "File not found" });
            return;
        }

        const readStream = gridfsBucket.openDownloadStreamByName(file.filename);
        readStream.pipe(res);
    } catch (error) {
        console.error("Error retrieving image:", error);
        res.status(500).json({ error: "Error retrieving image" });
    }
});
app.get("/roomsinfo",  async (req: Request, res: Response): Promise<void> => {
    try {
        const city = req.query.city;
        
        // ✅ Fetch all rooms associated with the user
        const roomsInfo = await RoomsModel.find( 
           { city}
         );
        if (!roomsInfo || roomsInfo.length === 0) {
            res.status(404).json({ error: "No rooms found for this user" });
            return;
        }

        // ✅ Modify each room object to include an image URL
        const roomsWithImages = roomsInfo.map(room => ({
            ...room.toObject(), // Convert Mongoose document to plain JS object
            imageURL: `http://localhost:3000/images/${room.imageFilenames}`, // Construct image URL
        }));

        res.json({ rooms: roomsWithImages,roomsInfo });

    } catch (error) {
        console.error("Error fetching rooms info:", error);
        res.status(500).json({ error: "Failed to fetch rooms" });
    }
});
app.get("/llroomsinfo", userMiddleware, async (req: Request, res: Response): Promise<void> => {
    try {
        //@ts-ignore
        const userId = req.userId;
        // ✅ Fetch all rooms associated with the user
        const roomsInfo = await RoomsModel.find( 
           { userId}
         );

        if (!roomsInfo || roomsInfo.length === 0) {
            res.status(404).json({ error: "No rooms found for this user" });
            return;
        }

        // ✅ Modify each room object to include an image URL
        const roomsWithImages = roomsInfo.map(room => ({
            ...room.toObject(), // Convert Mongoose document to plain JS object
            imageURL: `http://localhost:3000/images/${room.imageFilenames}`, // Construct image URL
        }));

        res.json({ rooms: roomsWithImages });

    } catch (error) {
        console.error("Error fetching rooms info:", error);
        res.status(500).json({ error: "Failed to fetch rooms" });
    }
});

app.delete("/deleteproperty/:id",userMiddleware, async (req,res)=>{
    try {
    const roomid = req.params.id;
    await RoomsModel.deleteOne({
        _id:roomid,
        //@ts-ignore
        userId : req.userId
    })
    res.json({
        message:"Room Deleted Successfully"
    })}
    catch(error){
        console.error("Error While Deleting Room")
    }
})
app.listen(3000)