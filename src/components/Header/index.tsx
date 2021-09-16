/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/extensions */
import React, { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Box, Icon, IconButton, Menu, Fade } from '@material-ui/core';

import { useAuth } from '../../hooks/useAuth';

import { useStyles } from './style';

import { formattedMonth, getNextMonth, getPrevMonth } from '../../helpers';

import { IHeader } from './type';

export const Header = memo(({ month }: IHeader) => {
  const { auth, handleSignOut } = useAuth();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  async function handleSingOutAndClose() {
    handleClose();
    await handleSignOut();
  }

  return (
    <Box display="flex" padding="8px">
      <Box flex="1" display="flex" alignItems="center">
        <IconButton
          aria-label="Mês anterior"
          component={Link}
          to={`/calendar/${getPrevMonth(month)}`}
        >
          <Icon>chevron_left</Icon>
        </IconButton>
        <IconButton
          aria-label="Próximo mês"
          component={Link}
          to={`/calendar/${getNextMonth(month)}`}
        >
          <Icon>chevron_right</Icon>
        </IconButton>
        <Box component="h3" marginLeft="16px">
          {formattedMonth(month)}
        </Box>
      </Box>

      <Box>
        <IconButton aria-label="Usuário" onClick={e => handleClick(e)}>
          <Avatar>
            <Icon>person</Icon>
          </Avatar>
        </IconButton>
        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <Box padding="24px">
            <Box
              width="100%"
              display="flex"
              justifyContent="end"
              marginBottom="16px"
            >
              <Avatar>
                <Icon>person</Icon>
              </Avatar>
            </Box>
            <p className={classes.name}>{auth.name}</p>
            <p className={classes.email}>{auth.email}</p>
            <span
              className={classes.btnLogout}
              onClick={() => handleSingOutAndClose()}
            >
              Sair
            </span>
          </Box>
        </Menu>
      </Box>
    </Box>
  );
});
