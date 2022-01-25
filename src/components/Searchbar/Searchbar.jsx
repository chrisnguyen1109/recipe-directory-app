import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Searchbar.module.css';

export default function Searchbar() {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const searchHandler = e => {
        e.preventDefault();

        navigate(`/search?q=${search}`);

        setSearch('');
    };

    return (
        <div className={styles.searchbar}>
            <form onSubmit={searchHandler}>
                <label htmlFor="search">Search:</label>
                <input
                    value={search}
                    id="search"
                    type="text"
                    autoComplete="off"
                    onChange={e => setSearch(e.target.value)}
                    required
                />
            </form>
        </div>
    );
}
