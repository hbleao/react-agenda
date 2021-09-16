export interface ICalendar {
  id: number;
  name: string;
  color: string;
}

export interface IEvent {
  id: number;
  date: string;
  time?: string;
  desc: string;
  calendarId: number;
}

export type ICalendarCell = {
  date: string;
  dayOfMonth: number;
  events: (IEvent & { calendar: ICalendar })[];
};

export type IGenerateCalendar = {
  calendars: ICalendar[];
  events: IEvent[];
  date: Date;
};
