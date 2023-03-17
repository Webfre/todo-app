import { useState, useEffect } from 'react';

import IValidateInput from '../Interface/IValidateInput';

const useValidateInput = (value: string, validations: IValidateInput) => {
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (value === '') {
      setErrorMessage('Введите задачу');
    } else if (value.length < validations.minLength) {
      setErrorMessage(`Введите более ${validations.minLength} символов`);
    } else if (value.length > validations.maxLength) {
      setErrorMessage(`Введите менее ${validations.maxLength} символов`);
    } else {
      setErrorMessage('');
    }
  }, [value]);

  return {
    errorMessage,
  };
};

export default useValidateInput;
