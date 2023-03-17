import { useState } from 'react';

import ITodo from '../Interface/ITodo';

function useCompletList() {
  const [completList, setCompletList] = useState(() => {
    const reference = localStorage.getItem('todos');

    if (reference) {
      return {
        fulfilled: JSON.parse(reference).filter(
          (item: { done: boolean }) => item.done === true,
        ).length,
        failed: JSON.parse(reference).filter(
          (item: { done: boolean }) => item.done === false,
        ).length,
      };
    }

    return {
      fulfilled: 0,
      failed: 0,
    };
  });

  const filterList = (newTodos: ITodo[]) => {
    setCompletList({
      fulfilled: newTodos.filter(item => item.done === true).length,
      failed: newTodos.filter(item => item.done === false).length,
    });
  };

  return {
    ...completList,
    filterList,
  };
}

export default useCompletList;
