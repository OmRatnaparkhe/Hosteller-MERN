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
exports.RoomsModel = exports.UserModel = exports.OtpModel = exports.SupportModel = exports.gridfsBucket = exports.gfs = exports.connectDB = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const mongodb_1 = require("mongodb");
const gridfs_stream_1 = __importDefault(require("gridfs-stream"));
const MongoUrl = "mongodb+srv://Om_Ratnaparkhe:U3RzMiDMBUnEZxeR@cluster0.x3xwp.mongodb.net/Hosteller";
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_2.default.connect(MongoUrl);
        console.log("✅ MongoDB Connected...");
    }
    catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
    }
});
exports.connectDB = connectDB;
const conn = mongoose_2.default.connection;
let gfs = null;
exports.gfs = gfs;
let gridfsBucket = null;
exports.gridfsBucket = gridfsBucket;
conn.once("open", () => {
    const db = conn.db; // Ensure 'db' is properly assigned
    exports.gfs = gfs = (0, gridfs_stream_1.default)(db, mongoose_2.default.mongo);
    gfs.collection("uploads"); // Store images in 'uploads' collection
    exports.gridfsBucket = gridfsBucket = new mongodb_1.GridFSBucket(db, { bucketName: "uploads" });
    console.log("✅ GridFS initialized!");
});
const CustomerSupportSchema = new mongoose_1.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    message: { type: String, length: 250 }
});
exports.SupportModel = (0, mongoose_1.model)("Supports", CustomerSupportSchema);
const OtpSchema = new mongoose_1.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, unique: true, length: 15, required: true },
    name: { type: String, length: 20 },
});
exports.OtpModel = (0, mongoose_1.model)("Otp", OtpSchema);
const UserSchema = new mongoose_1.Schema({
    username: { type: String, unique: true },
    mobileNo: { type: String, unique: true, length: 10 },
    email: String,
    password: { type: String, unique: true, length: 15 },
    college: String,
    type: String,
    userId: { type: mongoose_2.default.Types.ObjectId, ref: 'Otp', required: true },
});
exports.UserModel = (0, mongoose_1.model)("UserInfo", UserSchema);
const RoomsSchema = new mongoose_1.Schema({
    address: { type: String, required: true },
    rent: { type: String, required: true },
    members: { type: String, required: true },
    contact: { type: String, required: true },
    city: { type: String, required: true },
    imageFilenames: { type: [String], required: true },
    userId: { type: mongoose_2.default.Types.ObjectId, ref: 'Otp', required: true },
});
exports.RoomsModel = (0, mongoose_1.model)("Rooms", RoomsSchema);
