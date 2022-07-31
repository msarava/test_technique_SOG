import React from 'react';
import { useState } from 'react';
import { DateTime } from 'luxon';
import '../styles/Todo.css';
import { getTodos, updateTodo } from '../../services/api.services';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Checkbox, FormControlLabel } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ScheduleIcon from '@mui/icons-material/Schedule';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

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
  const creationDate = DateTime.fromISO(todo.createdAt)
    .setLocale('en-US')
    .toLocaleString({
      month: 'long',
      day: 'numeric',
    });
  const dueDate = DateTime.fromISO(todo.dueDate)
    .setLocale('en-US')
    .toLocaleString({ month: 'long', day: 'numeric' });
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
      <Card sx={{ minWidth: 500, bgcolor: todo.isDone ? 'gray' : 'inherit' }}>
        <CardHeader
          sx={{ padding: '0.2' }}
          avatar={
            <IconButton href={`/${todo.id}`}>
              <OpenInNewIcon />
            </IconButton>
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
              label={todo.isDone ? 'Done' : 'To do'}
            />
          }
          title={
            <Typography
              sx={{
                textDecoration: todo.isDone ? `line-through` : 'inherit',
                fontWeight: 'bold',
                fontSize: 20,
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
