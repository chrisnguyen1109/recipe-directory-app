import { Link } from 'react-router-dom';
import Searchbar from '../Searchbar/Searchbar';
import styles from './Navbar.module.css';
import useThemeContext from '../../hooks/useThemeContext';

export default function Navbar() {
    const { state } = useThemeContext();

    return (
        <div className={styles.navbar} style={{ background: state.navColor }}>
            <nav>
                <Link to="/" className={styles.brand}>
                    <h1>Cooking Recipe</h1>
                </Link>
                <Searchbar />
                <Link to="/create">Create Recipe</Link>
            </nav>
        </div>
    );
}
