import axios from 'axios';

export const getTodos = async () => {
  return axios.get(`http://localhost:3000/`);
};

export const createTodo = async (todo) => {
  return axios.post(`http://localhost:3000/`, { todo });
};

export const deleteTodo = async (todoId) => {
  return axios.delete(`http://localhost:3000/${todoId}`);
};

export const editTodo = async (todo) => {
  return axios.put(`http://localhost:3000/`, { todo });
};
