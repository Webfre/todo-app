import ITodo from '../Interface/ITodo';

interface ITodoListProps {
  items: ITodo[];
  onUpdateTodoList: (id: number, task: string) => void;
  onDeleteTodoList?: (id: number) => void;
  onDoneTodoList: (id: number) => void;
}

export default ITodoListProps;
