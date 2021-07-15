import React from 'react';
import {
  Card,
  CardContent,
  Button,
  Typography,
  TextField,
} from '@material-ui/core';
import QueueIcon from '@material-ui/icons/Queue';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  title: {
    backgroundColor: 'white',
    margin: '20vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  form: {
    '& > *': {
      width: '100%',
    },
  },
});

// Create an example component which both renders and modifies the GlobalState
export function Form() {
  const classes = useStyles();

  function handleChange(e) {
    console.log(e.target.value);
  }

  return (
    <Card className={classes.title}>
      <CardContent>
        <Typography align='center' gutterBottom variant='h3'>
          ToDo List
        </Typography>
        <Typography
          align='center'
          variant='h6'
          color='textSecondary'
          component='p'
        >
          Let's write something to remember!!!
        </Typography>
        <form className={classes.form} noValidate autoComplete='off'>
          <TextField
            onChange={handleChange}
            id='standard-basic'
            label='Add Todo'
          />
        </form>
      </CardContent>
      <Button
        className={classes.addButton}
        variant='contained'
        color='primary'
        disableElevation
      >
        <QueueIcon />
        Add Todo
      </Button>
    </Card>
  );
}
