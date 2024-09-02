export type Todo = {
  id: string;
  text: string;
  done: boolean;
};

export type TodoController = {
  addTodo: (todo: Omit<Todo, 'id'>) => void;
  deleteTodo: (id: Todo['id']) => void;
  updateTodo: (id: Todo['id'], newTodo: Todo) => void;
  toggleDone: (id: Todo['id']) => void;
};
