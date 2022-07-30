import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { DateTime } from 'luxon';
import '../styles/Todo.css';
import { getTodos, updateTodo } from '../../services/api.services';
import { bgcolor } from '@mui/system';

function Todo({ todo, setTodos, todos }) {
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  const creationDate = DateTime.fromISO(todo.createdAt).toLocaleString(
    DateTime.DATETIME_MED
  );
  const dueDate = DateTime.fromISO(todo.dueDate).toLocaleString(
    DateTime.DATETIME_MED
  );
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [checkStatus, setCheckStatus] = useState(todo.isDone);

  const handleCheckChange = async () => {
    await updateTodo({ ...todo, isDone: !checkStatus }, todo.id).then(
      async () => {
        setCheckStatus(!checkStatus);
        setTodos(await getTodos());
      }
    );
  };
  return (
    <div className='todo-container'>
      <Card sx={{ minWidth: 500, bgcolor: todo.isDone ?'gray':'inherit' }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'grey' }} aria-label='recipe'>
              <Typography> ToDo </Typography>
            </Avatar>
          }
          action={
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                  checkedIcon={<CheckBoxIcon />}
                  icon={<CheckBoxOutlineBlankIcon />}
                  checked={checkStatus}
                  onChange={handleCheckChange}
                />
              }
              label={todo.isDone ? 'done' : 'to do'}
            />
          }
          title={
            <Typography
              sx={{
                textDecoration: todo.isDone ? `line-through` : 'inherit',
                fontWeight: 'bold',
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
          <IconButton aria-label='add to favorites'>
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label='dueDate'>
            <ScheduleIcon />
            <Typography>Deadline : {dueDate}</Typography>
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <Typography paragraph>Note:</Typography>
            <Typography paragraph>{todo.note}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}

export default Todo;
