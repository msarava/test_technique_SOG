import { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { getTodos } from '../services/api.services';
import TodoContext from '../services/auth.services';
import './styles/App.css';
import Layout from './components/Layout';
import Todos from './components/Todos';
import TodoDetails from './components/TodoDetails';
import TodoEditDetails from './components/TodoEditDetails';

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
        <Router>
          <Routes>
            <Route path='/test_technique_Sog/' element={<Todos />} />
            <Route path='/test_technique_Sog/:id' element={<TodoDetails />} />
            <Route path='/test_technique_Sog/edit/:id' element={<TodoEditDetails />} />
          </Routes>
        </Router>
      </Layout>
    </TodoContext.Provider>
  );
}

export default App;
