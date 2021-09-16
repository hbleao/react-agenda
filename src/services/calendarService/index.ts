import { baseURL } from '../api';

import { handleResponse } from '../../helpers';

import { ICalendar } from './type';

export async function getCalendarService(): Promise<ICalendar[]> {
  const httpResultCalendar = await fetch(`${baseURL}/calendars`, {
    credentials: 'include',
  });
  return handleResponse(httpResultCalendar);
}
