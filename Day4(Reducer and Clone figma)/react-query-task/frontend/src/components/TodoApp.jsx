import { ApiState } from "./ApiState";
import { Todo } from "./Todo";
import { useCreateTodos, useDeleteTodos } from "../api/react-query";
import { useState } from "react";
import { v4 as uuid } from "uuid";

const _TodoApp = ({ todos, refetch }) => {
  const [task, setTask] = useState("");

  const { mutate: createTodo, isPending: isCreating } = useCreateTodos();

  console.log(isCreating);

  return (
    <div className="flex flex-column gap-1">
      <div className="flex gap-1">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button
          disabled={isCreating}
          onClick={() => {
            createTodo(
              { task, id: uuid(), done: false },
              {
                onError: (error) => {
                  console.error("Failed to add todo:", error);
                },
                onSuccess: () => {
                  setTask("");
                },
              }
            );
          }}
        >
          {isCreating ? "Loading..." : "Add Todo"}
        </button>
        <button onClick={refetch}>Refetch</button>
      </div>

      {(todos ?? []).map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export const TodoApp = ApiState(_TodoApp);
