import mailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config()


async function sendMail(to, subject, text) {
    let user = mailer.createTransport({
        service : "gmail",
        auth : {
            user : process.env.EMAIL,
            pass : process.env.PASS
        }
    });

    let sender = await user.sendMail({
        from : process.env.EMAIL,
        to : to,
        subject : subject,
        text : text
    })
    console.log("Mail sent",sender.messageId);
}


function otpGen(){
    let otp = Math.floor(Math.random() * (9999 - 1000) + 1000)
    return otp;
}
export {sendMail,otpGen}