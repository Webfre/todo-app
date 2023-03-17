import { useState, useEffect } from 'react';
import { ImCross } from 'react-icons/im';

import useInput from '../Hook/useInput';
import useCompletList from '../Hook/useCompletList';
import ITodo from '../Interface/ITodo';

import { TitleComponent } from './TitleComponent';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';
import '../Style/todo.scss';

function Todo() {
  const {
    value,
    onChange,
    onBlur,
    isDirty,
    setDirty,
    setValue,
    onResetInput,
    inputRef,
    errorMessage,
    onKeyDown,
  } = useInput('', { isEmpty: '', minLength: 3, maxLength: 25 }, handleAddTask);
  const { fulfilled, failed, filterList } = useCompletList();
  const [valueCompleted, setValueCompleted] = useState<string>('all');
  const [todoList, setTodoList] = useState<ITodo[]>(() => {
    // Получение данных из локального хранилища
    const reference = localStorage.getItem('todos');
    return reference ? JSON.parse(reference) : [];
  });

  // Добавление задач в локальное хранилище
  function addToLocalStorage(todos: ITodo[]) {
    localStorage.setItem('todos', JSON.stringify(todos));
    setTodoList(todos);
  }

  // Добавление задачи в список дел
  function handleAddTask() {
    const reference = localStorage.getItem('todos');
    const todos = reference ? JSON.parse(reference) : [];

    const newTodos = [
      {
        id: Math.floor(Math.random() * (1000000 - 0) + 0),
        task: value,
        done: false,
      },
      ...todos,
    ];

    addToLocalStorage(newTodos);
    setDirty(false);
    setValue('');
    filterTodoList(valueCompleted, newTodos);
    filterList(newTodos);
  }

  const onDeleteTodoList = (id: number): void => {
    const reference = localStorage.getItem('todos');
    const todos = reference ? JSON.parse(reference) : [];

    const newTodos = todos.filter((item: { id: number }) => item.id !== id);
    addToLocalStorage(newTodos);
    filterList(newTodos);
    filterTodoList(valueCompleted, newTodos);
  };

  const onUpdateTodoList = (id: number, task: string): void => {
    const reference = localStorage.getItem('todos');
    const todos = reference ? JSON.parse(reference) : [];

    const newTaskList = todos.map((item: { id: number; task: string }) => {
      if (item.id === id) {
        item.task = task;
        return item;
      }

      return item;
    });

    addToLocalStorage(newTaskList);
    filterTodoList(valueCompleted, newTaskList);
  };

  // Счетчик выполненных и не выпол. задач
  const onDoneTodoList = (id: number): void => {
    const reference = localStorage.getItem('todos');
    const todos = reference ? JSON.parse(reference) : [];

    const newTodos = todos.map((item: { id: number; done: boolean }) => {
      if (item.id === id) {
        item.done = !item.done;
        return item;
      }

      return item;
    });

    addToLocalStorage(newTodos);
    filterList(newTodos);
    filterTodoList(valueCompleted, newTodos);
  };

  // Фильтр выполненных и не выпол. задач
  const filterTodoList = (value: string, newTodos: ITodo[]) => {
    switch (value) {
      case 'all':
        setTodoList(newTodos);
        break;
      case 'completed':
        setTodoList(newTodos.filter(item => item.done));
        break;
      case 'not':
        setTodoList(newTodos.filter(item => !item.done));
        break;
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  });

  return (
    <>
      <TitleComponent failed={failed} />
      <div className='todo'>
        <p className='error'>{isDirty && errorMessage}</p>
        <div className='todo__form'>
          <div className='from'>
            <input
              ref={inputRef}
              value={value}
              onKeyDown={onKeyDown}
              onBlur={onBlur}
              onChange={onChange}
              type='text'
              placeholder='Введите задачу...'
            />
            <button
              onClick={onResetInput}
              className='btn__reset'
              style={{ display: 'inline-block' }}
              aria-label='Стереть'
            >
              <ImCross className='icon' />
            </button>
          </div>
          <button
            disabled={isDirty && errorMessage ? true : false}
            onClick={handleAddTask}
            className='btn__add'
          >
            Добавить
          </button>
        </div>

        <TodoFilter
          filterTodoList={filterTodoList}
          fulfilled={fulfilled}
          failed={failed}
          valueCompleted={valueCompleted}
          setValueCompleted={setValueCompleted}
        />
      </div>

      <TodoList
        items={todoList}
        onUpdateTodoList={onUpdateTodoList}
        onDeleteTodoList={onDeleteTodoList}
        onDoneTodoList={onDoneTodoList}
      />
    </>
  );
}

export default Todo;
