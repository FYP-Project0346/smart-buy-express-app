// const nodemailer = require("nodemailer");
const nodemailer = require("nodemailer")
const env = require("dotenv")

async function SendMail(html, receiver) {
    env.config({path: "./../.env"})
    console.log(process.env.USER)

    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: process.env.USER,
          pass: process.env.PASSWORD,
        },
      });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: {
        name: "SmartBuy",
        address: process.env.USER
    }, // sender address
    to: receiver, // list of receivers
    subject: "Welcome to SmartBuy", // Subject line
    // text: "Hello world?, Text", // plain text body
    html: html, // html body
  });
  return info.messageId;
//   console.log("Message sent: %s", info.messageId);
}

module.exports = {
  SendMail
}
