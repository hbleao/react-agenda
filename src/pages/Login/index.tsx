/* eslint-disable react/jsx-no-bind */
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Container, TextField, Box, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { useStyles } from './style';

import { useAuth } from '../../hooks/useAuth';

import { getToday } from '../../helpers';

export const LoginPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { handleSignIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmitForm(e: FormEvent) {
    try {
      e.preventDefault();
      await handleSignIn({ email, password });
      history.push(`/calendar/${getToday({ type: 'monthYear' })}`);
    } catch (error) {
      console.error(error);
    }
  }

  function handleValidateButtonSignIn() {
    if (email && password) return false;
    return true;
  }

  return (
    <div className={classes.loginContainer}>
      <Container maxWidth="sm">
        <Box
          component="form"
          onSubmit={handleSubmitForm}
          className={classes.form}
        >
          <Box marginBottom="32px">
            <h1>React Agenda</h1>
            <Box marginTop="16px">
              <p> Digite Email e Senha para entrar no sistema. </p>
            </Box>
          </Box>

          <TextField
            label="E-mail"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            autoFocus
            fullWidth
            margin="normal"
            variant="outlined"
          />

          <TextField
            label="Senha"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            fullWidth
            margin="normal"
            variant="outlined"
          />

          <Box marginTop="16px" width="100%">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={handleValidateButtonSignIn()}
            >
              ENTRAR
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};
