import * as nodemailer from "nodemailer";
import { PASSWORD, USER_ID } from "../utils/config";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: USER_ID,
    pass: PASSWORD,
  },
});

export const sendEmail = (
  username: string,
  email: string,
  secretKey: string
) => {
  try {
    const mailOptions = {
      from: USER_ID,
      to: email,
      subject: "Secret Key for Email Validation",
      text: `
Hello ${username},

This email contains your secret key for email validation: 

${secretKey}

Please keep this key confidential and do not share it with anyone.

Best Wishes,
The CSPT Team
`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
      } else {
        console.log("Email sent: ", info.response);
      }
    });
  } catch (error) {}
};
