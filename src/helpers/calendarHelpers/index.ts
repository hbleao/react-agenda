/* eslint-disable no-shadow */
import { formatLocalDate } from '../dateHelper';

import { ICalendarCell, IGenerateCalendar } from './type';

export function generateCalendar({
  calendars,
  events,
  date,
}: IGenerateCalendar): ICalendarCell[][] {
  const month: ICalendarCell[][] = [];
  const startDate = date;
  const currentMonth = startDate.getMonth();

  startDate.setDate(1);
  const dayOfWeek = startDate.getDay();
  startDate.setDate(dayOfWeek - 7);
  const allDaysOfWeek = takeWeek();
  const lastDayOfMonth = new Date(
    startDate.getFullYear(),
    currentMonth + 1,
    0
  ).getDate();
  console.log('TCL: lastDayOfMonth', lastDayOfMonth);

  function takeWeek() {
    const weeks = [...Array(7)].map((_, i) => i);
    return weeks;
  }

  function formattedMonth(month: Date) {
    const dayStr = (month.getMonth() + 1).toString().padStart(2, '0');
    return dayStr;
  }

  function formattedDay(day: Date) {
    const monthStr = day.getDate().toString().padStart(2, '0');
    return monthStr;
  }

  function formattedDate(date: Date) {
    return `${formattedDay(date)}-${formattedMonth(
      date
    )}-${date.getFullYear()}`;
  }

  do {
    const weeks = allDaysOfWeek.map(() => {
      const isoDate = formattedDate(startDate);
      const filteredEvents = events
        .filter(
          event =>
            formatLocalDate(new Date(event.date)) === formatLocalDate(startDate)
        )
        .map(event => {
          const calendar = calendars.find(
            calendar => calendar.id === event.calendarId
          )!;
          return {
            ...event,
            calendar,
          };
        });

      startDate.setDate(startDate.getDate() + 1);
      return {
        date: isoDate,
        events: filteredEvents,
        dayOfMonth: startDate.getDate(),
      };
    });

    month.push(weeks);
  } while (startDate.getMonth() === currentMonth);

  return month;
}
