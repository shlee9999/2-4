import './style.css';
import { Todo, TodoController } from '../../types';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import { MAX_INPUT_LENGTH } from '../../constants/constants';

interface TodoItemProps {
  todo: Todo;
  todoController: TodoController;
  index: number;
}
export default function TodoItem({ todo, todoController }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { done, id, text } = todo;
  const inputRef = useRef<HTMLInputElement>(null);

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      todoController.updateTodo(id, {
        ...todo,
        text: inputRef.current?.value ?? '',
      });
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.value = text;
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <li className={`todo-item`}>
      <div className='left-box'>
        {/* <span>{index + 1}.</span>
        &nbsp; */}
        <FontAwesomeIcon
          icon={(done ? faSquareCheck : faSquare) as IconProp}
          onClick={() => todoController.toggleDone(id)}
          cursor='pointer'
        />
        &nbsp;
        {isEditing ? (
          <input
            className='editor'
            type='text'
            ref={inputRef}
            onKeyUp={onKeyUp}
            maxLength={MAX_INPUT_LENGTH}
          />
        ) : (
          <p className='text' onClick={() => setIsEditing(true)}>
            {text}
          </p>
        )}
      </div>
      <div className='right-box'>
        <button className='edit-button' onClick={() => setIsEditing(true)}>
          edit
        </button>
        <button
          className='delete-button'
          onClick={() => todoController.deleteTodo(id)}
        >
          delete
        </button>
      </div>
    </li>
  );
}
