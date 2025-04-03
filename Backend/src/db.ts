import { model, Schema } from "mongoose"
import mongoose from "mongoose"
import {GridFSBucket,Db} from "mongodb";
import grid from "gridfs-stream";
const MongoUrl = "mongodb+srv://Om_Ratnaparkhe:U3RzMiDMBUnEZxeR@cluster0.x3xwp.mongodb.net/Hosteller";
const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect( MongoUrl);
        console.log("✅ MongoDB Connected...");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
    }
};

const conn = mongoose.connection;
let gfs: grid.Grid | null = null;
let gridfsBucket: GridFSBucket | null = null;

conn.once("open", () => {
    const db: Db = conn.db as Db; // Ensure 'db' is properly assigned
    gfs = grid(db, mongoose.mongo);
    gfs.collection("uploads"); // Store images in 'uploads' collection

    gridfsBucket = new GridFSBucket(db, { bucketName: "uploads" });

    console.log("✅ GridFS initialized!");
});

export { connectDB, gfs, gridfsBucket };


const CustomerSupportSchema = new Schema({
    name:String,
    email:{type:String, unique:true,required:true},
    message:{type:String,length:250}
}) 
export const SupportModel = model("Supports",CustomerSupportSchema);
const OtpSchema = new Schema ({
    email: {type:String, unique:true,required:true},
    password:{type:String,unique:true, length:15,required:true},
})

export const OtpModel = model("Otp",OtpSchema)

const UserSchema = new Schema({
    username:{type:String, unique:true},
    mobileNo:{type:String,unique:true,length:10},
    email:String,
    password:{type:String,unique:true, length:15},
    college:String,
    type:String,
    userId: {type: mongoose.Types.ObjectId,ref:'Otp', required:true},
})

export const UserModel = model("UserInfo",UserSchema)

const RoomsSchema = new Schema({
    address: { type: String, required: true },
    rent: { type: String, required: true },
    members: { type: String, required: true },
    contact: { type: String, required: true },
    city: { type: String, required: true },
    imageFilenames: { type: [String], required: true },
    userId: {type: mongoose.Types.ObjectId,ref:'Otp', required:true},
})

export const RoomsModel = model("Rooms",RoomsSchema)