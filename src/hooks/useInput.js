import { useState } from 'react';

const useInput = validateMethod => {
    const [value, setValue] = useState('');
    const [touched, setTouched] = useState(false);

    const inputValid = (validateMethod && validateMethod(value)) ?? true;
    const hasError = touched && !inputValid;

    const changeInputHandler = e => {
        setValue(e);
        setTouched(true);
    };

    const blurInputHandler = () => {
        setTouched(true);
    };

    const resetInputHandler = () => {
        setValue('');
        setTouched(false);
    };

    return {
        value,
        inputValid,
        hasError,
        changeInputHandler,
        blurInputHandler,
        resetInputHandler,
    };
};

export default useInput;
