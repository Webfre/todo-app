import { useRef, useState } from 'react';

import IValidateInput from '../Interface/IValidateInput';
import IUpdateData from '../Interface/IUpdateData';

import useValidateInput from './useValidateInput';

const useInput = (
  initialValue: string,
  validations: IValidateInput,
  handleAddTask: () => void,
) => {
  const [value, setValue] = useState<string>(initialValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidateInput(value, validations);
  const inputRef = useRef<HTMLInputElement>(null);
  const [updateData, setUpdateData] = useState<IUpdateData>({
    id: 0,
    task: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Изменения регистра первой буквы строки и удаление лишних пробелов
    const value = e.target.value.replace(
      /^[^a-zа-яё]*([a-zа-яё])/i,
      function (m) {
        return m.toUpperCase();
      },
    );

    setValue(value);
    setUpdateData({ ...updateData, task: e.target.value });
  };

  // Потеря фокуса input
  const onBlur = () => {
    setDirty(true);
  };

  // Очистка инпута
  const onResetInput = () => {
    setValue('');
    inputRef.current?.focus();
    setDirty(false);
  };

  // Добавление списка с клавиши 'Enter'
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !valid.errorMessage) {
      handleAddTask();
    } else if (e.key === 'Enter' && valid.errorMessage) {
      setDirty(true);
    }
  };

  // Обновление списка
  const handleEditing = (id: number, task: string) => {
    setValue(task);
    setUpdateData({ id, task });
  };

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    setDirty,
    setValue,
    onResetInput,
    inputRef,
    ...valid,
    onKeyDown,
    handleEditing,
    updateData,
    setUpdateData,
  };
};

export default useInput;
