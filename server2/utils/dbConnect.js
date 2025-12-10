import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

async function dbConnect() {
    let dbUri = process.env.DBURI;
    await mongoose.connect(dbUri);
    console.log("db connect");
}
dbConnect();
