import React from 'react';
import { CssBaseline, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Form } from './Form';
import { Global } from './Global';

import './App.css';

const useStyles = makeStyles({
  container: { minHeight: '80vh' },
});
function App() {
  const classes = useStyles();

  // Note: within the Root function we can return any Component (not just SomeComponent, but also a Router for instance)
  return (
    <Global
      Root={() => {
        return (
          <>
            <CssBaseline />
            <Container maxWidth='sm' className={classes.container}>
              <Form />
            </Container>
          </>
        );
      }}
    />
  );
}

export default App;
