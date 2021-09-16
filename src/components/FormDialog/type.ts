import { FormEvent } from 'react';

import {
  ICalendarScreenState,
  ICalendarScreenStateAction,
} from '../../pages/Calendar/type';

export interface IEvent {
  id: number;
  date: string;
  time?: string;
  desc: string;
  calendarId: number;
}

export interface ICalendar {
  id: number;
  name: string;
  color: string;
}

export type IFormDialog = {
  reducerState: ICalendarScreenState;
  dispatch: React.Dispatch<ICalendarScreenStateAction>;
  handleSubmit: (e: FormEvent) => void;
};
