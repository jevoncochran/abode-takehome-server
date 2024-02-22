import { ExistingEvent } from "../types/custom";

const filterFutureEvents = (events: ExistingEvent[]) => {
  const currentTime = new Date();
  const currentTimeAsNum = currentTime.getTime();
  const today = currentTime.setHours(0, 0, 0, 0);

  const futureEvents = events.filter((event) => {
    if (new Date(event.date).getTime() > today) {
      return true;
    } else if (new Date(event.date).getTime() === today) {
      if (
        event.startTime &&
        new Date(event.startTime).getTime() > currentTimeAsNum
      ) {
        return true;
      }
    }
  });

  return futureEvents;
};

export { filterFutureEvents };
