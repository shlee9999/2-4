import { Todo } from '../types';

export class LocalStorage {
  static key = 'todo';

  constructor() {}

  static getTodo(): Todo[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  static setTodo(newTodoList: Todo[]) {
    localStorage.setItem(this.key, JSON.stringify(newTodoList));
  }

  static addTodo(todo: Todo) {
    this.setTodo([todo, ...LocalStorage.getTodo()]);
  }

  static deleteTodo(id: Todo['id']) {
    this.setTodo(LocalStorage.getTodo().filter((todo) => todo.id !== id));
  }

  static updateTodo(id: Todo['id'], newTodo: Todo) {
    this.setTodo(
      LocalStorage.getTodo().map((todo) => (todo.id === id ? newTodo : todo))
    );
  }

  static toggleDone(id: Todo['id']) {
    const newTodoList = LocalStorage.getTodo().map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    LocalStorage.setTodo(newTodoList);
  }
}
