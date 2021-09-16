/* eslint-disable react/button-has-type */
import React from 'react';
import { TableCell } from '@material-ui/core';

import { CalendarTime } from '../../CalendarTime';

import { useStyles } from './style';

import { IEventTableCell } from './type';

export function EventTableCell({
  cell,
  calendarsSelected,
  handleClickDay,
  handleClickEvent,
}: IEventTableCell) {
  const { dayOfMonth, eventClass, bgDescription } = useStyles();

  return (
    <TableCell align="center" onClick={e => handleClickDay(cell.date, e)}>
      <div className={dayOfMonth}>{cell.dayOfMonth}</div>
      {cell.events.map(event => (
        <button
          key={event.desc}
          className={eventClass}
          onClick={e => handleClickEvent(event, e)}
        >
          {calendarsSelected.includes(event.calendar.id) && event.time && (
            <CalendarTime time={event.time} color={event.calendar.color} />
          )}{' '}
          {calendarsSelected.includes(event.calendar.id) && (
            <span
              className={event.time ?? bgDescription}
              style={{ background: event.time ?? event.calendar.color }}
            >
              {event.desc}
            </span>
          )}
        </button>
      ))}
    </TableCell>
  );
}
