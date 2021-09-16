/* eslint-disable no-case-declarations */
import { useReducer } from 'react';
import { generateCalendar } from '../../helpers';

import { ICalendarScreenState, ICalendarScreenStateAction } from './type';

function reducer(
  state: ICalendarScreenState,
  action: ICalendarScreenStateAction
): ICalendarScreenState {
  switch (action.type) {
    case 'load':
      return {
        ...state,
        isLoading: true,
        isModalOpen: false,
        isEditing: false,
        events: action.payload.events,
        calendars: action.payload.calendars,
        calendarsSelected: action.payload.calendars.map(
          calendars => calendars.id
        ),
      };

    case 'generateCalendar':
      return {
        ...state,
        weeks: generateCalendar({
          calendars: action.payload.calendars,
          events: action.payload.events,
          date: action.payload.date,
        }),
        isLoading: false,
      };

    case 'createEvent':
      return {
        ...state,
        isModalOpen: true,
        dialogEvent: {
          id: action.payload.id,
          calendarId: 1,
          date: action.payload.date,
          desc: '',
          time: action.payload.time,
        },
      };

    case 'createEventByDay':
      return {
        ...state,
        isEditing: false,
        dialogEvent: {
          id: action.payload.id,
          calendarId: 1,
          date: action.payload.date,
          desc: '',
          time: action.payload.time,
        },
        isModalOpen: true,
      };

    case 'editEvent':
      return {
        ...state,
        isModalOpen: true,
        isEditing: true,
        dialogEvent: {
          id: action.payload.id,
          calendarId: action.payload.calendarId,
          date: action.payload.date,
          desc: action.payload.desc,
          time: action.payload.time,
        },
      };

    case 'changeDialogData':
      return {
        ...state,
        dialogEvent: {
          id: action.payload.id,
          calendarId: action.payload.calendarId,
          date: action.payload.date,
          desc: action.payload.desc,
          time: action.payload.time,
        },
      };

    case 'calendarSelection':
      const calendarIdExists = state.calendarsSelected.find(
        (calendarsId: number) => calendarsId === action.payload.id
      );
      return {
        ...state,
        calendarsSelected: calendarIdExists
          ? state.calendarsSelected.filter(
              (calendars: number) => calendars !== action.payload.id
            )
          : [...state.calendarsSelected, action.payload.id],
      };

    case 'closeModal':
      return {
        ...state,
        isModalOpen: false,
      };

    default:
      return state;
  }
}

export function useCalendarReducer() {
  const [state, dispatch] = useReducer(reducer, {
    weeks: [],
    calendars: [],
    events: [],
    calendarsSelected: [],
    isLoading: false,
    isModalOpen: false,
    isEditing: false,
    dialogEvent: {
      id: 0,
      calendarId: 1,
      date: '',
      desc: '',
      time: '',
    },
  });

  return {
    state,
    dispatch,
  };
}
