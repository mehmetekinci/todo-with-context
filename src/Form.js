import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Container,
  Button,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
} from '@material-ui/core';
import { Queue, HighlightOff, Edit } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useGlobalState } from './useGlobalState';
import { formatDate } from './formatDate';

const useStyles = makeStyles({
  title: {
    backgroundColor: 'white',
    marginTop: '20vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  form: {
    '& > *': {
      width: '100%',
    },
  },
  list: {
    width: '100%',
    marginTop: '10px',
  },
  listItem: {
    backgroundColor: 'white',
    marginBottom: '10px',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: '10%',
  },
});

// Create an example component which both renders and modifies the GlobalState
export function Form() {
  const [text, setText] = useState('');

  const { todos } = useGlobalState();

  const classes = useStyles();

  function handleChange(e) {
    setText(e.target.value);
    console.log(e.target.value);
  }

  function addTodo() {
    const newTodo = { text, date: formatDate() };
    window.GlobalState.set({
      todos: [...todos, newTodo],
    });
    setText('');
  }

  return (
    <>
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
              value={text}
              onChange={handleChange}
              id='standard-basic'
              label='Add Todo'
            />
          </form>
        </CardContent>
        <Button
          onClick={addTodo}
          className={classes.addButton}
          variant='contained'
          color='primary'
          disableElevation
        >
          <Queue />
          Add Todo
        </Button>
      </Card>
      {todos && todos.length > 0 && (
        <List className={classes.list}>
          {todos.map((todo, i) => {
            return (
              <ListItem key={i} className={classes.listItem}>
                <Checkbox
                  defaultChecked
                  color='primary'
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
                <ListItemText primary={todo.text} secondary={todo.date} />
                <Container className={classes.buttonsContainer}>
                  <IconButton size='small' color='secondary'>
                    <HighlightOff />
                  </IconButton>
                  <IconButton size='small' color='primary'>
                    <Edit />
                  </IconButton>
                </Container>
              </ListItem>
            );
          })}
        </List>
      )}
    </>
  );
}
