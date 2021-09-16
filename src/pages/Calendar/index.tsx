/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect, useMemo, FormEvent, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { Box } from '@material-ui/core';

import {
  createEventService,
  updateEventService,
  getCalendarService,
  getEventsService,
} from '../../services';

import { getMonth, getToday, getTime, formatDayToDate } from '../../helpers';

import { Header, FormDialog, Sidebar, Table } from '../../components';

import { useCalendarReducer } from './reduceCalendar';

import { ICalendar, IEvent } from './type';

export function Calendar() {
  const { month } = useParams<{ month: string }>();
  const { dispatch, state } = useCalendarReducer();

  const memoHandleGenerateDate = useMemo(() => {
    return function handleGenerateDate(
      calendars: ICalendar[],
      events: IEvent[]
    ) {
      dispatch({
        type: 'generateCalendar',
        payload: { calendars, events, date: getMonth(month) },
      });
    };
  }, [dispatch, month]);

  async function handleLoadInitialServices() {
    try {
      const [calendarServiceResponse, eventServiceResponse] = await Promise.all(
        [getCalendarService(), getEventsService()]
      );

      dispatch({
        type: 'load',
        payload: {
          calendars: calendarServiceResponse,
          events: eventServiceResponse,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  const handleCalendarsSelection = useMemo(() => {
    return (calendarId: number) => {
      dispatch({
        type: 'calendarSelection',
        payload: {
          id: calendarId,
        },
      });
    };
  }, [dispatch]);

  const handleCreateNewEvent = useCallback(() => {
    dispatch({
      type: 'createEvent',
      payload: {
        id: Math.floor(Math.random() * 10000),
        date: getToday({ type: 'USFull' }),
        time: getTime(),
      },
    });
  }, [dispatch]);

  async function handleSubmitCreateEvent(e: FormEvent) {
    try {
      e.preventDefault();
      await createEventService(state.dialogEvent);
      handleLoadInitialServices();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmitEditingEvent(e: FormEvent) {
    try {
      e.preventDefault();
      await updateEventService(state.dialogEvent);
      handleLoadInitialServices();
    } catch (error) {
      console.error(error);
    }
  }

  const handleCreateEventByDay = useCallback(
    (day: string) => {
      dispatch({
        type: 'createEventByDay',
        payload: {
          id: Math.floor(Math.random() * 10000),
          date: formatDayToDate(day),
          time: getTime(),
        },
      });
    },
    [dispatch]
  );

  const handleEditingSelectedEvent = useCallback(
    (event: IEvent, e: MouseEvent) => {
      e.stopPropagation();
      dispatch({
        type: 'editEvent',
        payload: {
          id: event.id,
          calendarId: event.calendarId,
          date: event.date,
          desc: event.desc,
          time: event.time,
        },
      });
    },
    [dispatch]
  );

  useEffect(() => {
    handleLoadInitialServices();
  }, []);

  useEffect(() => {
    memoHandleGenerateDate(state.calendars, state.events);
  }, [state.calendars, state.events, month]);

  return (
    <Box display="flex" height="100%" alignItems="stretch">
      <Sidebar
        calendars={state.calendars}
        calendarsSelected={state.calendarsSelected}
        handleCalendarsSelection={handleCalendarsSelection}
        handleCreateNewEvent={handleCreateNewEvent}
      />
      <Box display="flex" flexDirection="column" flex="1">
        <Header month={month} />
        <Table
          isLoading={state.isLoading}
          calendarsSelected={state.calendarsSelected}
          weeks={state.weeks}
          handleClickDay={handleCreateEventByDay}
          handleClickEvent={handleEditingSelectedEvent}
        />
      </Box>
      <FormDialog
        handleSubmit={
          state.isEditing ? handleSubmitEditingEvent : handleSubmitCreateEvent
        }
        dispatch={dispatch}
        reducerState={state}
      />
    </Box>
  );
}
