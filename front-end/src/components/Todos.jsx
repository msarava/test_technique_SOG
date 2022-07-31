import React from 'react';
import { useState, useEffect, useContext } from 'react';
import TodoContext from '../../services/auth.services';
import Todo from './Todo';
import TodoForm from './TodoForm';
import { IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function Todos() {
  const { todos, setTodos } = useContext(TodoContext);
  const [showForm, setShowForm] = useState(false);
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    setTodoList(todos);
  }, [todos]);
  return (
    <div>
      {!showForm && (
        <IconButton
          onClick={() => setShowForm(!showForm)}
          sx={{ '& .MuiSvgIcon-root': { fontSize: 45 } }}
        >
          <AddCircleIcon /> Create new ToDo
        </IconButton>
      )}
      {showForm && (
        <TodoForm
          setShowForm={setShowForm}
          showForm={showForm}
          todos={todos}
          setTodos={setTodos}
        />
      )}
      {todoList
        .sort((a, b) =>
          a.dueDate > b.dueDate ? 1 : b.dueDate > a.dueDate ? -1 : 0
        )
        .sort((a, b) =>
          a.isDone > b.isDone ? 1 : b.isDone > a.isDone ? -1 : 0
        )
        .map((todo) => (
          <Todo key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />
        ))}
    </div>
  );
}

export default Todos;
