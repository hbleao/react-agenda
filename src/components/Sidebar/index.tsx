/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { memo } from 'react';
import { Box, Button, Checkbox, FormControlLabel } from '@material-ui/core';

import { ISidebar } from './type';

export const Sidebar = memo(
  ({
    calendars = [],
    calendarsSelected = [],
    handleCalendarsSelection = () => null,
    handleCreateNewEvent,
  }: ISidebar) => {
    return (
      <Box borderRight="1px solid #e0e0e0" width="12em" padding="16px">
        <Box component="h2">Agenda React</Box>

        <Box marginTop="24px">
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateNewEvent}
          >
            Novo evento
          </Button>
        </Box>

        <Box marginTop="64px">
          <Box marginBottom="24px" component="h3">
            Agendas
          </Box>
          {calendars.map(calendar => (
            <FormControlLabel
              key={calendar.id}
              label={calendar.name}
              control={
                <Checkbox
                  checked={calendarsSelected.includes(calendar.id)}
                  value={calendar.name}
                  style={{ color: calendar.color }}
                  onChange={() => handleCalendarsSelection(calendar.id)}
                />
              }
            />
          ))}
        </Box>
      </Box>
    );
  }
);
