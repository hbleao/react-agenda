import React, { memo } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from '@material-ui/core';

import { IFormDialog } from './type';

export const FormDialog = memo(
  ({ reducerState, dispatch, handleSubmit }: IFormDialog) => {
    return (
      <Dialog
        open={reducerState.isModalOpen}
        onClose={() => dispatch({ type: 'closeModal' })}
        aria-labelledby="form-dialog"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog">
            {reducerState.isEditing ? 'Editar Evento' : 'Novo Evento'}
          </DialogTitle>
          <DialogContent>
            <TextField
              type="date"
              margin="normal"
              value={reducerState.dialogEvent.date}
              onChange={e =>
                dispatch({
                  type: 'changeDialogData',
                  payload: {
                    ...reducerState.dialogEvent,
                    date: e.currentTarget.value,
                  },
                })
              }
              fullWidth
            />
            <TextField
              margin="normal"
              placeholder="Descrição"
              value={reducerState.dialogEvent.desc}
              onChange={e =>
                dispatch({
                  type: 'changeDialogData',
                  payload: {
                    ...reducerState.dialogEvent,
                    desc: e.currentTarget.value,
                  },
                })
              }
              autoFocus
              fullWidth
            />
            <TextField
              type="time"
              value={reducerState.dialogEvent.time}
              onChange={e =>
                dispatch({
                  type: 'changeDialogData',
                  payload: {
                    ...reducerState.dialogEvent,
                    time: e.currentTarget.value,
                  },
                })
              }
              margin="normal"
              fullWidth
            />
            <FormControl margin="normal" fullWidth>
              <InputLabel id="label-agenda">Agendas</InputLabel>
              <Select
                labelId="label-agenda"
                value={reducerState.dialogEvent.calendarId}
                onChange={e =>
                  dispatch({
                    type: 'changeDialogData',
                    payload: {
                      ...reducerState.dialogEvent,
                      calendarId: Number(e.currentTarget.value),
                    },
                  })
                }
              >
                {reducerState.calendars.map(({ id, name }) => (
                  <MenuItem key={id} value={id}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions style={{ marginTop: '32px' }}>
            <Button
              onClick={() => dispatch({ type: 'closeModal' })}
              color="secondary"
            >
              Cancelar
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Cadastrar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
);
