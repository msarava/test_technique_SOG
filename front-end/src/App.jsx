import { useContext, useEffect, useState } from 'react';

import { getTodos } from '../services/api.services';
import TodoContext from '../services/auth.services';
import './styles/App.css';
import Layout from './components/Layout';
import Todos from './components/Todos';

function App() {
  const all = useContext(TodoContext);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos()
      .then((result) => setTodos(result))
      .catch((error) => console.error(error));
  }, []);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      <Layout>
        <Todos />
      </Layout>
    </TodoContext.Provider>
  );
}

export default App;
