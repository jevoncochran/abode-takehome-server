import { ExistingEvent } from "../types/custom";

const sortEvents = (events: ExistingEvent[]) => {
  return events.sort((a, b) => {
    const dateComparison =
      new Date(a.date).getTime() - new Date(b.date).getTime();
    if (dateComparison !== 0) {
      return dateComparison;
    }

    // If events have the same date, compare by startTime
    if (a.startTime && b.startTime) {
      return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
    }

    // If one of the events doesn't have a startTime, prioritize the one with no startTime
    if (!a.startTime && b.startTime) {
      return -1;
    } else if (a.startTime && !b.startTime) {
      return 1;
    }

    // If both events don't have a startTime, they are considered equal
    return 0;
  });
};

export { sortEvents };
