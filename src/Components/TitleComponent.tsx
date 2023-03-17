import { useState, useEffect } from 'react';
import Helmet from 'react-helmet';

interface TitleComponentProps {
  failed: number;
}

const TitleComponent = ({ failed }: TitleComponentProps) => {
  const [defaultTitle, setDefaultTitle] = useState('Список задач 📔');

  const sklonenie = (number: number, txt: string[], cases: number[]) => {
    return txt[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  };

  const task = sklonenie(
    failed,
    ['задача', 'задачи', 'задачь'],
    [2, 0, 1, 1, 1, 2],
  );

  useEffect(() => {
    if (failed === 0) {
      setDefaultTitle('Список задач 📔');
    } else {
      setDefaultTitle(`Осталось ещё ${failed} ${task} ✅`);
    }
  }, [failed]);

  return (
    <Helmet>
      <title>{defaultTitle}</title>
    </Helmet>
  );
};

export { TitleComponent };
