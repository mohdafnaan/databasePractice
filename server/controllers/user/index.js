import express from "express";
import bcrypt from "bcrypt";
import userModel from "../../models/User/User.js";
import { sendMail, otpGen } from "../../utils/mailer.js";
import encrypt from "../../utils/ecnrypt.js";

const router = express.Router();

router.get("/getalluser", async (req, res) => {
  try {
    let allusers = await userModel.find();
    res.status(200).json({ msg: allusers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.post("/register", async (req, res) => {
  try {
    let userInput = req.body;
    userInput.gender = userInput.gender.toLowerCase();
    userInput.password = await bcrypt.hash(userInput.password, 10);
    let OTP = otpGen();
    userInput.otp = OTP;
    await sendMail(
      userInput.email,
      "OTP",
      `your otp is ${OTP}.\nplease enter the otp to verify your account `
    );
    await userModel.create(userInput);
    res.status(200).json({ msg: "registration done sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.post("/otpverify", async (req, res) => {
  try {
    let email = req.body.email;
    let otp = req.body.otp;
    let user = await userModel.findOne({email});
    if (!user) {
      return res.status(400).json({ msg: "user not found" });
    }
    if(otp !== user.otp){
        return res.status(400).json({msg : "Wrong OTP"})
    }
    await userModel.findOneAndUpdate({email},{$set : {isVerified : true},$unset : {otp :""}},{new : true});
    res.status(200).json({msg : "verified sucessfully"})
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.post("/login", async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    let user = await userModel.findOne({email});
    if(!user.isVerified){
        return res.status(400).json({msg : "verify your account to get the account"})
    }
    if (!user) {
      return res.status(400).json({ msg: "user not found" });
    }
    let Bpass =await bcrypt.compare(password, user.password);

    if (!Bpass) {
      return res.status(400).json({ msg: "invalid password" });
    }
    let playload = {email}
    let token = await encrypt(playload)
    res.status(200).json({msg : "login sucessfully",token})
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

export default router;
