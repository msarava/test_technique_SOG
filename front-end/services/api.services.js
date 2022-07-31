import axios from 'axios';

const Api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export async function getTodos() {
  const url = '/todo';
  const results = Api.get(url).then((response) => response.data);
  return results;
}

export async function getOneTodo(id) {
  const url = `/todo/${id}`;
  const results = Api.get(url).then((response) => response.data);
  return results;
}
export async function createTodo(newTodo) {
  const url = '/todo';
  const results = Api.post(url, newTodo).then((response) => response.data);
  return results;
}

export async function updateTodo(updateTodo, id) {
  const url = `/todo/${id}`;
  const results = Api.put(url, updateTodo).then((response) => response.data);
  return results;
}
