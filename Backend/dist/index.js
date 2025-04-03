"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const body_parser_1 = __importDefault(require("body-parser"));
const middleware_1 = require("./middleware");
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const db_2 = require("./db");
const cors_1 = __importDefault(require("cors"));
const console_1 = require("console");
const JWT_PASSWORD = "12334234";
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
//connect to MongoDB
(0, db_2.connectDB)();
app.post("/contactUs", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    try {
        yield db_1.SupportModel.create({
            name: name,
            email: email,
            message: message
        });
    }
    catch (error) {
        res.json({ message: "Request Failed!", error });
    }
}));
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    try {
        yield db_1.OtpModel.create({
            email,
            password,
            name
        });
        res.json({
            message: "Signed up successfully!"
        });
    }
    catch (e) {
        res.status(411).json({
            message: "Incorrect Number", error: console_1.error
        });
    }
}));
app.post("/signin", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    console.log(email);
    const existingUser = yield db_1.UserModel.findOne({
        email
    });
    if (!existingUser) {
        res.status(401).json({ error: "User not found" });
        return;
    }
    res.json({
        existingUser
    });
}));
app.post("/userInfo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, mobileNo, email, college, type, password } = req.body;
    const existingOtpUser = yield db_1.OtpModel.findOne({ email, password });
    if (!existingOtpUser) {
        res.status(403).json({ message: "Incorrect Email or Password" });
        return;
    }
    let user = yield db_1.UserModel.findOne({ email });
    if (user) {
        const token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_PASSWORD);
        res.json({ message: "User already exists", token, user });
        return;
    }
    user = new db_1.UserModel({
        username,
        mobileNo,
        email,
        college,
        type,
        password,
        userId: existingOtpUser._id,
    });
    yield user.save();
    const token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_PASSWORD);
    res.json({
        message: "Profile Created",
        token,
        user
    });
    return;
}));
app.get("/getUserInfo", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const userInfo = yield db_1.UserModel.findOne({
        //@ts-ignore
        _id: req.userId
    });
    res.json({
        userInfo,
        userId
    });
}));
//Upload Room with Image
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage }).array("images", 5);
// ✅ Upload Room with Image
app.post("/rooms", upload, middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { address, rent, members, contact, city } = req.body;
        const files = req.files;
        //@ts-ignore
        const userId = req.userId;
        if (!files) {
            res.status(400).json({ error: "No file uploaded" });
            return;
        }
        if (!db_2.gridfsBucket) {
            console.error("GridFS is not initialized.");
            res.status(500).json({ error: "GridFS is not initialized" });
            return;
        }
        let filenames = [];
        // Manually write the file to GridFS
        files.forEach((file) => {
            const filename = `${Date.now()}-${file.originalname}`;
            filenames.push(filename);
            const uploadStream = db_2.gridfsBucket.openUploadStream(filename);
            uploadStream.end(file.buffer);
        }); // Write file buffer to GridFS
        const newRoom = new db_1.RoomsModel({
            address,
            rent,
            members,
            contact,
            city,
            imageFilenames: filenames, // Store filename in MongoDB
            userId
        });
        yield newRoom.save();
        res.status(201).json({ message: "Room added successfully!", room: newRoom });
    }
    catch (error) {
        console.error("Error adding room:", error);
        res.status(500).json({ error: "Failed to add room" });
        return;
    }
}));
// ✅ Retrieve Images
app.get("/images/:filename", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!db_2.gfs || !db_2.gridfsBucket) {
            res.status(500).json({ error: "GridFS is not initialized" });
            return;
        }
        const file = yield db_2.gfs.files.findOne({ filename: req.params.filename });
        if (!file || file.length === 0) {
            res.status(404).json({ error: "File not found" });
            return;
        }
        const readStream = db_2.gridfsBucket.openDownloadStreamByName(file.filename);
        readStream.pipe(res);
    }
    catch (error) {
        console.error("Error retrieving image:", error);
        res.status(500).json({ error: "Error retrieving image" });
    }
}));
app.get("/roomsinfo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const city = req.query.city;
        // ✅ Fetch all rooms associated with the user
        const roomsInfo = yield db_1.RoomsModel.find({ city });
        if (!roomsInfo || roomsInfo.length === 0) {
            res.status(404).json({ error: "No rooms found for this user" });
            return;
        }
        // ✅ Modify each room object to include an image URL
        const roomsWithImages = roomsInfo.map(room => (Object.assign(Object.assign({}, room.toObject()), { imageURL: `http://localhost:3000/images/${room.imageFilenames}` })));
        res.json({ rooms: roomsWithImages, roomsInfo });
    }
    catch (error) {
        console.error("Error fetching rooms info:", error);
        res.status(500).json({ error: "Failed to fetch rooms" });
    }
}));
app.get("/llroomsinfo", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const userId = req.userId;
        // ✅ Fetch all rooms associated with the user
        const roomsInfo = yield db_1.RoomsModel.find({ userId });
        if (!roomsInfo || roomsInfo.length === 0) {
            res.status(404).json({ error: "No rooms found for this user" });
            return;
        }
        // ✅ Modify each room object to include an image URL
        const roomsWithImages = roomsInfo.map(room => (Object.assign(Object.assign({}, room.toObject()), { imageURL: `http://localhost:3000/images/${room.imageFilenames}` })));
        res.json({ rooms: roomsWithImages });
    }
    catch (error) {
        console.error("Error fetching rooms info:", error);
        res.status(500).json({ error: "Failed to fetch rooms" });
    }
}));
app.delete("/deleteproperty/:id", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roomid = req.params.id;
        yield db_1.RoomsModel.deleteOne({
            _id: roomid,
            //@ts-ignore
            userId: req.userId
        });
        res.json({
            message: "Room Deleted Successfully"
        });
    }
    catch (error) {
        console.error("Error While Deleting Room");
    }
}));
app.listen(3000);
