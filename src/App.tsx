import React from 'react';
import { ThemeProvider } from 'react-jss';
import injectSheet from 'react-jss';
import Color from 'color';

import theme from './theme';
import Home from './screens/Home';

const styles = {
  '@global': {
    '*': {
      boxSizing: 'border-box'
    },
    input: {
      padding: 10,
      fontSize: '1rem',
      borderRadius: theme.border.radius,
      borderWidth: theme.border.width,
      borderStyle: 'solid',
      borderColor: theme.border.color,
      transition: 'all 200ms ease',
      outlineColor: theme.border.color,
      '&:focus-within': {
        outlineColor: Color(theme.colors.primary).alpha(0.3).hexa(),
        outlineStyle: 'solid',
        boxShadow: '0 0 4px 2px ' + Color(theme.colors.primary).alpha(0.1).hexa()

      },
    }
  }
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
}

export default injectSheet(styles)(App);
