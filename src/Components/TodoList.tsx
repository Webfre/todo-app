import { useEffect } from 'react';

import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { RxUpdate } from 'react-icons/rx';

import useInput from '../Hook/useInput';
import ITodoListProps from '../Interface/ITodoListProps';
import '../Style/todolist.scss';

function TodoList({
  items,
  onDeleteTodoList,
  onUpdateTodoList,
  onDoneTodoList,
}: ITodoListProps) {
  const {
    value,
    onChange,
    onBlur,
    isDirty,
    inputRef,
    errorMessage,
    onKeyDown,
    handleEditing,
    updateData,
    setUpdateData,
  } = useInput('', { isEmpty: '', minLength: 3, maxLength: 25 }, handleAddTask);

  function handleAddTask() {
    const { id, task } = updateData;
    onUpdateTodoList(id, task);
    setUpdateData({ id: 0, task: '' });
  }

  useEffect(() => {
    inputRef.current?.focus();
  });

  return (
    <div className={items.length === 0 ? '' : 'todolist'}>
      {updateData.id ? (
        <>
          <div className='edit'>
            <input
              ref={inputRef}
              onChange={onChange}
              className='edit__input'
              type='text'
              value={value}
              onKeyDown={onKeyDown}
              onBlur={onBlur}
            />
            <button
              disabled={isDirty && errorMessage ? true : false}
              onClick={handleAddTask}
              className='btn__edit'
            >
              Обновить
            </button>
          </div>
          <p style={{ height: '0px' }} className='error'>
            {isDirty && errorMessage}
          </p>
        </>
      ) : (
        <>
          {items.map(({ id, task, done }) => {
            return (
              <div key={id} className='list'>
                <div className='task'>
                  {done ? (
                    <>
                      <AiFillStar onClick={() => onDoneTodoList(id)} />
                    </>
                  ) : (
                    <>
                      <AiOutlineStar onClick={() => onDoneTodoList(id)} />
                    </>
                  )}
                  <div
                    className='task__item'
                    onClick={() => handleEditing(id, task)}
                  >
                    {task}
                  </div>
                </div>

                <div className='update'>
                  <button onClick={() => onDeleteTodoList?.(id)}>
                    <MdDelete />
                  </button>
                  <button onClick={() => handleEditing(id, task)}>
                    <RxUpdate />
                  </button>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default TodoList;
