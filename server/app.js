import express from "express";
import dotenv from "dotenv";
dotenv.config()

// import all APIs 
import userRouter from "./controllers/user/index.js"
// import db
import "./utils/dbConnect.js"

const app = express();
app.use(express.json());

const port = process.env.PORT;

app.get("/",(req,res)=>{
    try {
        res.status(200).json({msg : "test api"})
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg : error})
    }
})
app.post("/register",(req,res)=>{
    try {
        let Fname = req.body.name;
        let Aage = req.body.age;
        res.status(200).json({Fname,Aage})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg : error})
    }
})

app.use("/user",userRouter)
app.listen(port,()=>{
    console.log(`server running at http://localhost:5000`);
})