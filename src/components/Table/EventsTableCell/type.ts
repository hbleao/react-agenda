export interface ICalendar {
  id: number;
  name: string;
  color: string;
}

export type ICalendarCell = {
  date: string;
  dayOfMonth: number;
  events: (IEvent & { calendar: ICalendar })[];
};

export interface IEvent {
  id: number;
  date: string;
  time?: string;
  desc: string;
  calendarId: number;
}

export type IEventTableCell = {
  cell: ICalendarCell;
  calendarsSelected: number[];
  handleClickDay: (day: string, e: any) => void;
  handleClickEvent: (event: IEvent, e: any) => void;
};
