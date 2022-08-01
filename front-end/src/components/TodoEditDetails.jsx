import React from 'react';
import { DateTime } from 'luxon';
import '../styles/Todo.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getOneTodo, updateTodo } from '../../services/api.services';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';

function TodoEditDetails() {
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

  const handleChange = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  };
  const navigate = useNavigate();
  const handleSave = (event) => {
    event.preventDefault();
    updateTodo(todo, id).then(() => navigate(`/test_technique_Sog/${id}`));
  };
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
            <TextField
              name='title'
              value={todo.title}
              fullWidth
              sx={{ fontWeight: 'bold' }}
              placeholder={todo.title}
              onChange={handleChange}
            />
          }
          subheader={`created ${creationDate}`}
        />
        <CardContent>
          <TextField
            name='description'
            value={todo.description}
            fullWidth
            multiline
            rows={4}
            onChange={handleChange}
          />
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label='dueDate'>
            <ScheduleIcon />
          </IconButton>
          <TextField
            name='dueDate'
            value={todo.dueDate}
            type='date'
            helperText='Please enter the limit date'
            onChange={handleChange}
          />
        </CardActions>
        <CardContent>
          <Typography paragraph>Note:</Typography>
          <TextField
            name='note'
            value={todo.note}
            fullWidth
            multiline
            rows={2}
            onChange={handleChange}
          />
        </CardContent>
      </Card>
      <IconButton
        onClick={handleSave}
        sx={{ '& .MuiSvgIcon-root': { fontSize: 45 } }}
      >
        <SaveIcon /> Save
      </IconButton>
      <IconButton
        onClick={() => navigate(`/test_technique_Sog/${id}`)}
        sx={{ '& .MuiSvgIcon-root': { fontSize: 45 } }}
      >
        <ClearIcon /> Cancel
      </IconButton>
    </div>
  );
}

export default TodoEditDetails;
