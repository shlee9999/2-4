import './style.css';
import { Todo, TodoController } from '../../types';
import TodoItem from '../TodoItem';
import NoTodo from './NoTodo';

interface TodoContainerProps {
  todoList?: Todo[];
  todoController: TodoController;
}
export default function TodoContainer({
  todoList,
  todoController,
}: TodoContainerProps) {
  if (todoList?.length === 0) return <NoTodo />;
  return (
    <ul className={`todo-con `}>
      {todoList?.map((todo, index) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          todoController={todoController}
          index={index}
        />
      ))}
    </ul>
  );
}
