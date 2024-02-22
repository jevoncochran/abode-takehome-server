import { checkUpcomingJobs } from "./utils/cronJobs";
const app = require("./api/server");

// Scans event database every minute checking for events for which alerts need to be sent to invitees
checkUpcomingJobs();

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`*** Server listening on port ${port} ***`));
