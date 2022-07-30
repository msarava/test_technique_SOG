import React from 'react';
import { useContext } from 'react';
import TodoContext from '../../services/auth.services';
import Todo from './Todo';
import TodoForm from './TodoForm';
import { IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState } from 'react';

function Todos() {
  const { todos } = useContext(TodoContext);
  const [showForm, setShowForm] = useState(false);
  return (
    <div>
      {!showForm && (
        <IconButton
          onClick={() => setShowForm(!showForm)}
          sx={{ '& .MuiSvgIcon-root': { fontSize: 45 } }}
        >
          <AddCircleIcon /> New ToDo
        </IconButton>
      )}
      {showForm && <TodoForm setShowForm={setShowForm} showForm={showForm} />}
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

export default Todos;
