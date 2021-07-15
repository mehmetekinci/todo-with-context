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
  ButtonGroup,
} from '@material-ui/core';
import { Queue, HighlightOff, Edit, Save, Delete } from '@material-ui/icons';
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
  const [editingIndex, setEditingIndex] = useState(null);

  const { todos } = useGlobalState();

  const classes = useStyles();

  function handleChange(e) {
    setText(e.target.value);
  }

  function addTodo() {
    const newTodo = { text, date: formatDate(), isCompleted: false };
    window.GlobalState.set({
      todos: [newTodo, ...todos],
    });
    setText('');
  }

  function deleteTodo(index) {
    window.GlobalState.set({
      todos: todos.filter((_, i) => i !== index),
    });
  }

  function onEditMode(index) {
    setEditingIndex(index);
    setText(todos[index].text);
  }

  function saveChanges() {
    window.GlobalState.set({
      todos: todos.map((todo, i) => {
        return editingIndex === i ? { ...todo, text } : todo;
      }),
    });
    cancelEditMode();
  }

  function cancelEditMode() {
    setText('');
    setEditingIndex(null);
  }

  function toggleComplete(index) {
    window.GlobalState.set({
      todos: todos.map((todo, i) => {
        return index === i ? { ...todo, isCompleted: !todo.isCompleted } : todo;
      }),
    });
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
          <TextField
            fullWidth
            value={text}
            onChange={handleChange}
            id='standard-basic'
            label='Add Todo'
          />
        </CardContent>
        {editingIndex !== null ? (
          <ButtonGroup fullWidth>
            <Button
              disabled={!(text && text.length > 3)}
              onClick={saveChanges}
              className={classes.addButton}
              variant='contained'
              color='primary'
              disableElevation
            >
              <Save />
              Save Changes
            </Button>
            <Button
              onClick={cancelEditMode}
              variant='contained'
              color='secondary'
              disableElevation
            >
              <HighlightOff />
              Cancel
            </Button>
          </ButtonGroup>
        ) : (
          <Button
            disabled={!(text && text.length > 3)}
            onClick={addTodo}
            variant='contained'
            color='primary'
            disableElevation
          >
            <Queue />
            Add Todo
          </Button>
        )}
      </Card>
      {todos && todos.length > 0 && (
        <List className={classes.list}>
          {todos.map((todo, i) => {
            return (
              <ListItem
                disabled={todo.isCompleted}
                key={i}
                className={classes.listItem}
              >
                <Checkbox
                  onChange={() => toggleComplete(i)}
                  checked={todo.isCompleted}
                  color='primary'
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
                <ListItemText primary={todo.text} secondary={todo.date} />
                <Container className={classes.buttonsContainer}>
                  <IconButton
                    onClick={() => deleteTodo(i)}
                    size='small'
                    color='secondary'
                  >
                    <Delete />
                  </IconButton>
                  <IconButton
                    onClick={() => onEditMode(i)}
                    size='small'
                    color='primary'
                  >
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
