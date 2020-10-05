import React, { FunctionComponent } from 'react';

import { createMuiTheme, MuiThemeProvider as ThemeProvider } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CssBaseline from '@material-ui/core/CssBaseline';

import deepOrange from '@material-ui/core/colors/deepOrange';
import indigo from '@material-ui/core/colors/indigo';
import lightBlue from '@material-ui/core/colors/lightBlue';
import red from '@material-ui/core/colors/red';

interface Props {
  children?: React.ReactNode;
}

export const defaultTheme = createMuiTheme({
  palette: {
    error: red,
    primary: deepOrange,
    secondary: indigo,
    type: 'light',
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    error: red,
    primary: deepOrange,
    secondary: lightBlue,
    type: 'dark',
  },
});

const Theme: FunctionComponent<Props> = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = prefersDarkMode ? darkTheme : defaultTheme;

  return (
    <ThemeProvider theme={ theme }>
      <CssBaseline />
      { children }
    </ThemeProvider>
  );
};

export default Theme;
