import ITodo from './ITodo';

interface ITodoFilterProps {
  fulfilled: number;
  failed: number;
  valueCompleted: string;
  setValueCompleted: (value: string) => void;
  filterTodoList: (value: string, newTodos: ITodo[]) => void;
}

export default ITodoFilterProps;
