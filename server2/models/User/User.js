import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
    {
        fullName : {
            type : "string",
            required : true,
            trim : true
        },
        email : {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true
        },
        password : {
            type : String,
            required : true
        },
        phone : {
            type : Number,
            required : true,
            trim : true,
            unique : true
        },
        age : {
            type : Number ,
            required : true,
            minlength : [18, "minimum age is 18"],
            maxlength : [80, "maximum age is 80"]
        },
        gender : {
            type : String,
            enum : ["Male", "Female", "Others"],
            required : true
        },
        isActive : {
            type : Boolean,
            default : true
        }
    },
    {
        timestamps : true,
    }
);


const userModel = mongoose.model("users",userSchema);

export default userModel;