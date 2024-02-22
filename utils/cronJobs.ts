import cron from "node-cron";
import { sendEmailAlert } from "./sendEmailAlert";
import { getAllUpcomingEvents } from "../services/eventService";
import dayjs from "dayjs";

const checkUpcomingJobs = () => {
  cron.schedule("* * * * *", async () => {

    const currentTime = new Date();

    const upcomingEvents = await getAllUpcomingEvents();

    for (const upcomingEvent of upcomingEvents) {
      // Only sends the alert for events that have a start time
      // TODO: Figure out how to handle alerts for all day events (i.e. send alert 24 hours before)
      if (upcomingEvent.startTime) {
        // Identify events set to begin in ~ 30 minutes
        if (
          dayjs(upcomingEvent.startTime).diff(dayjs(currentTime), "minutes") ===
          29
        ) {
          // Send email alert to each guest
          // TODO: Also send alert to event host
          for (const guest of upcomingEvent.guests) {
            await sendEmailAlert(upcomingEvent, guest);
          }
        }
      }
    }
  });
};

export { checkUpcomingJobs };
