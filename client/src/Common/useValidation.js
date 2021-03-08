import { useEffect, useState } from 'react';

const useValidation = (value, validators) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [minLengthErr, setMinLengthErr] = useState(false);
  const [matchPasswords, setMatchPasswords] = useState(false);

  useEffect(() => {
    for (const validator in validators) {
      switch (validator) {
        case 'isEmpty':
          value ? setIsEmpty(false) : setIsEmpty(true);
          break;
        case 'minLengthErr':
          value < validators[validator] ? setMinLengthErr(true) : setMinLengthErr(false);
          break;
        case 'matchPasswords':
          break;
      }
    }
  }, [value]);

  return {
    isEmpty,
    minLengthErr,
    matchPasswords
  };
};

export default useValidation;
