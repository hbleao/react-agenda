/* eslint-disable radix */
import { MONTHS } from '../constants/helpers/dateHelper';

export function formatLocalDate(date: Date): string {
  return date.toLocaleDateString().replaceAll('/', '-');
}

export type IGetToday = {
  type?: 'day' | 'month' | 'monthYear' | 'dayMonth' | 'USFull';
  today?: Date;
};

export function getToday({ type, today = new Date() }: IGetToday): string {
  const formattedToday = formatLocalDate(today);

  if (type === 'monthYear') {
    return formattedToday.substr(3, 7);
  }

  if (type === 'USFull') {
    const [day, month, year] = formattedToday.split('-');
    return `${year}-${month}-${day}`;
  }

  return formattedToday;
}

export function getMonth(monthYear: string): Date {
  const [month, year] = monthYear.split('-');

  const formattedDate = new Date(parseInt(year), parseInt(month) - 1, 1, 10);
  return formattedDate;
}

export function formattedMonth(date: string): string {
  const [month, year] = date.split('-');

  const formattedDate = `${MONTHS[parseInt(month) - 1]} de ${year}`;
  return formattedDate;
}

export function getTime(): string {
  const currentTime = new Date().toLocaleTimeString();
  return currentTime.substr(0, 5);
}

export function formatDayToDate(date: string): string {
  const [day, month, year] = date.split('-');
  const newDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  newDate.setDate(newDate.getDate() + 1);
  const [formattedDay, formattedMonth, formattedYear] = newDate
    .toLocaleDateString()
    .split('/');
  const formattedDate = `${formattedYear}-${formattedMonth}-${formattedDay}`;
  return formattedDate;
}

export function getPrevMonth(monthYear: string): string {
  const [month, year] = monthYear.split('-');
  const formattedDate = new Date(
    parseInt(year),
    parseInt(month) - 2,
    parseInt('01')
  );
  return getToday({ type: 'monthYear', today: formattedDate });
}

export function getNextMonth(monthYear: string): string {
  const [month, year] = monthYear.split('-');
  const formattedDate = new Date(
    parseInt(year),
    parseInt(month),
    parseInt('01')
  );
  return getToday({ type: 'monthYear', today: formattedDate });
}
