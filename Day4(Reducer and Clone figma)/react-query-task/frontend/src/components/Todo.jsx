import { useDeleteTodos, useEditTodos } from "../api/react-query";

export const Todo = ({ todo }) => {
  const { mutate: deleteTodo, isPending: isDeleting } = useDeleteTodos();
  const { mutate: editTodo, isPending: isEditing } = useEditTodos();
  return (
    <div className="flex items-center">
      <input
        checked={todo.done}
        type="checkbox"
        onChange={(e) => editTodo({ ...todo, done: e.target.checked })}
      />
      <span className="flex-grow">{todo.task}</span>
      <button
        disabled={isDeleting}
        onClick={() => deleteTodo(todo.id)}
        className="color-danger"
      >
        {isDeleting ? "deleting" : "Delete"}
      </button>
     
    </div>
  );
};
