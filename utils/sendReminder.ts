import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { google } from "googleapis";

dotenv.config();

const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

// const transporter = nodemailer.createTransport({
//   service: "Gmail",
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     type: "OAuth2",
//     user: process.env.NODEMAILER_EMAI,
//     // pass: process.env.NODEMAILER_APP_PASSWORD,
//     clientId: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
//     accessToken: oAuth2Client.getAccessToken(),
//   },
// });

// const mailOptions = {
//   from: "your_email@gmail.com",
//   to: "jevon.cochran@gmail.com",
//   subject: "Hello from Nodemailer",
//   text: "This is a test email sent using Nodemailer.",
// };

// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.error("Error sending email: ", error);
//   } else {
//     console.log("Email sent: ", info.response);
//   }
// });

export const sendMail = async () => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.NODEMAILER_EMAIL,
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
          accessToken, // Make sure to provide the actual accessToken
        },
      } as nodemailer.TransportOptions);

    const mailOptions = {
      from: "your_email@gmail.com",
      to: "jevon.cochran@gmail.com",
      subject: "Hello from Nodemailer",
      text: "This is a test email sent using Nodemailer.",
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
};

sendMail()
  .then((res) => console.log("Email sent...", res))
  .catch((err) => console.log(err));
