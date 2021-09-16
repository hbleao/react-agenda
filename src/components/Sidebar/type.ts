export interface ICalendar {
  id: number;
  name: string;
  color: string;
}

export type ISidebar = {
  calendars?: ICalendar[];
  calendarsSelected?: number[];
  handleCalendarsSelection?: (number: number) => void;
  handleCreateNewEvent?: () => void;
};
