// import pacakages 
import express from "express";
import dotenv from "dotenv";
dotenv.config();

// import apis
import userRouter from "./controllers/user/index.js";

// import database;
import "./utils/dbConnect.js"

const app = express();
app.use(express.json());
const port = process.env.PORT;

app.get("/",(req,res)=>{
    try {
        res.status(200).json({msg : "server is running"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg : error})
    }
})
app.use("/user",userRouter)
app.listen(port,()=>{
console.log(`server is running at http://localhost:5000`);
})

