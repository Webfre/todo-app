import React from 'react';

import ITodoFilterProps from '../Interface/ITodoFilterProps';

function TodoFilter({
  fulfilled,
  failed,
  filterTodoList,
  setValueCompleted,
  valueCompleted,
}: ITodoFilterProps) {
  function chengeValue(e: React.ChangeEvent<HTMLInputElement>) {
    setValueCompleted(e.target.value);
    const reference = localStorage.getItem('todos');
    filterTodoList(e.target.value, reference ? JSON.parse(reference) : []);
  }

  return (
    <div className='todo__filter'>
      <div className='filter__top'>
        <div>
          <label className='custom-radio'>
            <input
              checked={valueCompleted === 'all' ? true : false}
              value='all'
              onChange={chengeValue}
              type='radio'
            />
            <span>Все</span>
          </label>
        </div>
        <div>
          <label className='custom-radio'>
            <input
              checked={valueCompleted === 'completed' ? true : false}
              value='completed'
              onChange={chengeValue}
              type='radio'
            />
            <span>Выполненные</span>
          </label>
        </div>
        <div>
          <label className='custom-radio'>
            <input
              checked={valueCompleted === 'not' ? true : false}
              value='not'
              onChange={chengeValue}
              type='radio'
            />
            <span>Не выполненные</span>
          </label>
        </div>
      </div>

      <div className='filter__bottom'>
        <h3 className='green'>Выполненных: {fulfilled}</h3>
        <h3 className='red'>Не выполненных: {failed}</h3>
      </div>
    </div>
  );
}

export default TodoFilter;
