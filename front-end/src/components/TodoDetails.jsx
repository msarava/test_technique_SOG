import React from 'react';
import { DateTime } from 'luxon';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { getOneTodo } from '../../services/api.services';
import '../styles/Todo.css';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ScheduleIcon from '@mui/icons-material/Schedule';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import EditIcon from '@mui/icons-material/Edit';

function TodoDetails() {
  const { id } = useParams();
  const [todo, setTodo] = useState({});
  useEffect(() => {
    getOneTodo(id).then((result) => setTodo(result));
  }, []);
  const creationDate = DateTime.fromISO(todo.createdAt)
    .setLocale('en-US')
    .toLocaleString({
      month: 'long',
      day: 'numeric',
    });
  const dueDate = DateTime.fromISO(todo.dueDate)
    .setLocale('en-US')
    .toLocaleString({ month: 'long', day: 'numeric' });
  return (
    <div>
      <Card sx={{ minWidth: 700, bgcolor: todo.isDone ? 'gray' : 'inherit' }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'grey' }}>
              <Typography> ToDo </Typography>
            </Avatar>
          }
          title={
            <Typography
              sx={{
                textDecoration: todo.isDone ? `line-through` : 'inherit',
                fontWeight: 'bold',
                fontSize: 25,
              }}
            >
              {todo.title}
            </Typography>
          }
          subheader={`created ${creationDate}`}
        />
        <CardContent>
          <Typography variant='body2' color='text.secondary'>
            {todo.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label='dueDate'>
            <ScheduleIcon />
            <Typography>Deadline : {dueDate}</Typography>
          </IconButton>
        </CardActions>
        <CardContent>
          <Typography paragraph>Note:</Typography>
          <Typography paragraph>{todo.note}</Typography>
        </CardContent>
      </Card>
      <IconButton href='/' sx={{ '& .MuiSvgIcon-root': { fontSize: 45 } }}>
        <KeyboardReturnIcon /> Back to list
      </IconButton>
      <IconButton
        href={`/edit/${id}`}
        sx={{ '& .MuiSvgIcon-root': { fontSize: 45 } }}
      >
        <EditIcon /> Edit Todo
      </IconButton>
    </div>
  );
}

export default TodoDetails;
