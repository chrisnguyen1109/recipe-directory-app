import { useEffect, useReducer } from 'react';
import { changeModeColor, changeNavColor } from './actions';
import themeReducer, { initialState } from './reducer';
import ThemeContext from './themeContext';

export default function ThemeProvider({ children }) {
    const [state, dispatch] = useReducer(themeReducer, initialState, () => {
        return JSON.parse(localStorage.getItem('theme')) || initialState;
    });

    const changeNavColorHandler = color => {
        dispatch(changeNavColor(color));
    };

    const changeModeColorHandler = () => {
        dispatch(
            changeModeColor(state.modeColor === 'dark' ? 'light' : 'dark')
        );
    };

    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(state));
    }, [state]);

    return (
        <ThemeContext.Provider
            value={{ state, changeNavColorHandler, changeModeColorHandler }}
        >
            {children}
        </ThemeContext.Provider>
    );
}
