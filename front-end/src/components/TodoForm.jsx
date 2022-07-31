import React from 'react';
import { useState } from 'react';
import '../styles/Todo.css';
import { createTodo } from '../../services/api.services';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button, TextField } from '@mui/material';
import ScheduleIcon from '@mui/icons-material/Schedule';

export default function TodoForm({ setShowForm, showForm, setTodos, todos }) {
  const [newTodo, setNewTodo] = useState({
    title: '',
    dueDate: '',
    description: '',
    note: '',
  });
  const handleChange = (event) => {
    setNewTodo({ ...newTodo, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createTodo(newTodo).then((createdTodo) =>
      setTodos([...todos, createdTodo])
    );
    setShowForm(!showForm);
  };
  return (
    <div className='todo-container'>
      <h2>New Todo</h2>
      <Card sx={{ minWidth: 500 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'grey' }}>
              <Typography> ToDo </Typography>
            </Avatar>
          }
          title={
            <TextField
              name='title'
              value={newTodo.title}
              fullWidth
              sx={{ fontWeight: 'bold' }}
              placeholder='Title'
              onChange={handleChange}
            />
          }
        />

        <CardContent>
          <TextField
            name='description'
            value={newTodo.description}
            fullWidth
            multiline
            rows={4}
            placeholder='Description'
            onChange={handleChange}
          />
        </CardContent>
        <CardActions disableSpacing>
          <ScheduleIcon />
          <TextField
            name='dueDate'
            value={newTodo.dueDate}
            type='date'
            helperText='Please enter the limit date'
            onChange={handleChange}
          />
        </CardActions>
        <CardContent>
          <Typography paragraph>Note:</Typography>
          <TextField
            name='note'
            value={newTodo.note}
            fullWidth
            multiline
            rows={2}
            placeholder='Add a note'
            onChange={handleChange}
          />
        </CardContent>
        <CardContent sx={{ textAlign: 'center' }}>
          <Button
            onClick={handleSubmit}
            variant='contained'
            sx={{ marginRight: '1rem' }}
          >
            Save
          </Button>
          <Button
            onClick={() => setShowForm(!showForm)}
            variant='outlined'
            sx={{ marginLeft: '1rem' }}
          >
            Cancel
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
