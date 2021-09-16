/* eslint-disable react/no-array-index-key */
import React, { memo } from 'react';
import {
  Table as MaterialTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

import { useStyles } from './style';

import { EventTableCell } from './EventsTableCell';

import { DAYS_OF_WEEK } from '../../constants/pages/calendar';

import { ITable } from './type';

export const Table = memo(
  ({
    isLoading,
    weeks,
    calendarsSelected,
    handleClickDay,
    handleClickEvent,
  }: ITable) => {
    const classes = useStyles();

    return (
      <TableContainer style={{ flex: 1 }} component="div">
        <MaterialTable className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {DAYS_OF_WEEK.map((day, k) => (
                <TableCell key={k} align="center">
                  {day}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading &&
              weeks.map((week, i) => (
                <TableRow key={i}>
                  {week.map((cell, j) => (
                    <EventTableCell
                      key={j}
                      cell={cell}
                      calendarsSelected={calendarsSelected}
                      handleClickDay={handleClickDay}
                      handleClickEvent={handleClickEvent}
                    />
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </MaterialTable>
      </TableContainer>
    );
  }
);
