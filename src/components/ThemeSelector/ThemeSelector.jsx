import modeIcon from '../../assets/mode-icon.svg';
import styles from './ThemeSelector.module.css';
import useThemeContext from '../../hooks/useThemeContext';

const themeColors = ['#58249c', '#249c6b', '#ac2f50'];

export default function ThemeSelector() {
    const { state, changeNavColorHandler, changeModeColorHandler } =
        useThemeContext();

    return (
        <div className={styles['theme-selector']}>
            <div className={styles['mode-toggle']}>
                <img
                    onClick={changeModeColorHandler}
                    src={modeIcon}
                    style={{
                        filter:
                            state.modeColor === 'dark'
                                ? 'invert(100%)'
                                : 'invert(20%)',
                    }}
                    alt="dark/light toggle icon"
                />
            </div>
            <div className={styles['theme-buttons']}>
                {themeColors.map(color => (
                    <div
                        key={color}
                        onClick={() => changeNavColorHandler(color)}
                        style={{ background: color }}
                    />
                ))}
            </div>
        </div>
    );
}
