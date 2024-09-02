import { useEffect, useRef, useState } from 'react';
import TodoContainer from '../components/TodoContainer';
import './style.css';
import { Todo, TodoController } from '../types';
import { LocalStorage } from '../lib/localStorage';
import { generateId } from '../utils/generateId';

export default function HomePage() {
  const [todoList, setTodoList] = useState<Todo[]>(LocalStorage.getTodo());
  const inputRef = useRef<HTMLInputElement>(null);
  const addTodo = (todo: Omit<Todo, 'id'>) => {
    const id = generateId();
    setTodoList((prev) => [{ ...todo, id }, ...prev]);
    LocalStorage.addTodo({ ...todo, id });
  };
  const deleteTodo = (id: Todo['id']) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
    LocalStorage.deleteTodo(id);
  };
  const updateTodo = (id: Todo['id'], newTodo: Todo) => {
    LocalStorage.updateTodo(id, newTodo);
    setTodoList((prev) =>
      prev.map((todo) => (todo.id === id ? newTodo : todo))
    );
  };
  const toggleDone = (id: Todo['id']) => {
    const newTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    setTodoList(newTodoList);
    LocalStorage.toggleDone(id);
  };
  const todoController: TodoController = {
    addTodo,
    deleteTodo,
    updateTodo,
    toggleDone,
  };
  const onClickSubmit = () => {
    if (!inputRef.current) return;
    if (!inputRef.current.value.trim()) return;
    todoController.addTodo({
      text: (inputRef.current as HTMLInputElement).value,
      done: false,
    });
    inputRef.current.value = '';
    inputRef.current.focus();
  };
  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onClickSubmit();
  };
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);
  return (
    <main className='main-page'>
      <div className='wrap'>
        <h1 className='logo'>TodoList</h1>
        <div className='submit-container'>
          <input
            type='text'
            className='todo-input'
            ref={inputRef}
            onKeyUp={onKeyUp}
            maxLength={25}
          />
          {/* <button className='delete_all-btn'>delete all</button> */}
          <button className='submit-button' onClick={onClickSubmit}>
            submit
          </button>
        </div>
        <TodoContainer todoList={todoList} todoController={todoController} />
      </div>
    </main>
  );
}
