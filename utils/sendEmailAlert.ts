import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { google } from "googleapis";
import { Event, Invite } from "../types/custom";

dotenv.config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

export const sendEmailAlert = async (event: Event, guest: Invite) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.NODEMAILER_EMAIL,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken, 
      },
    } as nodemailer.TransportOptions);

    const mailOptions = {
      from: "abodetakehome@gmail.com",
      to: guest.email,
      subject: `Notification: ${event.title} starts in 30 minutes`,
      text: "This is a test email sent using Nodemailer.",
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
};

