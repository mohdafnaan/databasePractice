import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

async function encrypt(user) {
    let token = jwt.sign(user,process.env.SEC_KEY,{expiresIn : "1D"})
    return token;
}
export default encrypt