import { createTodo, deleteTodo, editTodo, getTodos } from '../api/axios';
import { useCallback, useEffect, useState } from 'react';

import { TodoApp } from './TodoApp';

export const AxiosApp = () => {
  const [state, setState] = useState({
    isLoading: false,
    error: null,
    todos: [],
  });

  useEffect(() => {
    setState({ isLoading: true, error: false, todos: [] });
    getTodos()
      .then((result) =>
        setState({ isLoading: false, error: null, todos: result.data })
      )
      .catch((result) =>
        setState({ isLoading: false, error: result.response.data, todos: [] })
      );
  }, []);

  const createNewTodo = useCallback((todo) => {
    setState({ isLoading: true, error: false, todos: [] });
    createTodo(todo)
      .then((result) =>
        setState({ isLoading: false, error: null, todos: result.data })
      )
      .catch((result) =>
        setState({ isLoading: false, error: result.response.data, todos: [] })
      );
  }, []);

  const deleteExistingTodo = useCallback((todoId) => {
    setState({ isLoading: true, error: false, todos: [] });
    deleteTodo(todoId)
      .then((result) =>
        setState({ isLoading: false, error: null, todos: result.data })
      )
      .catch((result) =>
        setState({ isLoading: false, error: result.response.data, todos: [] })
      );
  }, []);

  const editExistingTodo = useCallback((todo) => {
    setState({ isLoading: true, error: false, todos: [] });
    editTodo(todo)
      .then((result) =>
        setState({ isLoading: false, error: null, todos: result.data })
      )
      .catch((result) =>
        setState({ isLoading: false, error: result.response.data, todos: [] })
      );
  }, []);

  return (
    <TodoApp
      deleteExistingTodo={deleteExistingTodo}
      createNewTodo={createNewTodo}
      editExistingTodo={editExistingTodo}
      todos={state.todos}
      isLoading={state.isLoading}
      error={state.error}
    />
  );
};
