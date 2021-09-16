import React, { Icon } from '@material-ui/core';

import { styles } from './styles';

export type ICalendarTime = {
  color: string;
  time: string;
};

export function CalendarTime({ color, time }: ICalendarTime) {
  return (
    <span>
      <Icon style={{ position: 'relative', color, ...styles.eventTime }}>
        watch_later
      </Icon>
      {time}{' '}
    </span>
  );
}
