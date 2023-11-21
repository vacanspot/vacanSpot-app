import {useEffect, useState} from 'react';

const useDebounce = (value: string, delay: number) => {
  const [debounceValue, setDebounceValue] = useState('');

  useEffect(() => {
    const time = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(time);
    };
  }, [value, delay]);

  return debounceValue;
};

export default useDebounce;
