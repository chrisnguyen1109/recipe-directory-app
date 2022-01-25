import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext/themeContext';

const useThemeContext = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error(
            'useThemeContext() must be used inside a ThemeProvider'
        );
    }

    return context;
};

export default useThemeContext;
