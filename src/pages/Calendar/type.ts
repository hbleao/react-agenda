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

export interface IDialogEvent {
  id: number;
  calendarId: number;
  date: string;
  time?: string;
  desc: string;
}

export type ICalendarScreenState = {
  weeks: ICalendarCell[][];
  calendars: ICalendar[];
  events: IEvent[];
  calendarsSelected: number[];
  isLoading: boolean;
  isModalOpen: boolean;
  isEditing: boolean;
  dialogEvent: IDialogEvent;
};

export type ICalendarScreenStateAction =
  | {
      type: 'load';
      payload: {
        events: IEvent[];
        calendars: ICalendar[];
      };
    }
  | {
      type: 'editEvent';
      payload: IEvent;
    }
  | {
      type: 'createEvent';
      payload: {
        id: number;
        date: string;
        time?: string;
      };
    }
  | {
      type: 'generateCalendar';
      payload: {
        events: IEvent[];
        calendars: ICalendar[];
        date: Date;
      };
    }
  | {
      type: 'calendarSelection';
      payload: {
        id: number;
      };
    }
  | {
      type: 'createEventByDay';
      payload: {
        id: number;
        date: string;
        time?: string;
      };
    }
  | {
      type: 'closeModal';
    }
  | {
      type: 'changeDialogData';
      payload: {
        id: number;
        calendarId: number;
        date: string;
        desc: string;
        time?: string;
      };
    };
