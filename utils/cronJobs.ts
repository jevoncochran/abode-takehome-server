import cron from "node-cron";
import { sendMail } from "./sendReminder";

export function scheduleEmailAlerts() {
  cron.schedule("* * * * *", () => {
    // Logic to send email alerts
    sendMail();
  });
}
