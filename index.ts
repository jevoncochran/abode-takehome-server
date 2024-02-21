import { getAllUpcomingEvents } from "./services/eventService";
import { scheduleEmailAlerts } from "./utils/cronJobs";

const app = require("./api/server");

// Schedule the email alerts cron job
// scheduleEmailAlerts();

getAllUpcomingEvents();

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`*** Server listening on port ${port} ***`));
