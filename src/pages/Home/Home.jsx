import { useEffect, useState } from 'react';
import RecipeList from '../../components/RecipeList/RecipeList';
import styles from './Home.module.css';
import useThemeContext from '../../hooks/useThemeContext';
import { collection, onSnapshot } from 'firebase/firestore';
import db from '../../firebase/config';
import { deleteRecipe } from '../../firebase/firebaseActions';
import useFirebaseFetch from '../../hooks/useFirebaseFetch';

export default function Home() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const {
        state: { modeColor },
    } = useThemeContext();
    const { fetchData } = useFirebaseFetch();

    const deleteRecipeHandler = recipeId => fetchData(deleteRecipe(recipeId));

    useEffect(() => {
        setLoading(true);

        const unsub = onSnapshot(
            collection(db, 'recipes'),
            response => {
                if (!response.empty) {
                    setRecipes([]);
                    response.docs.forEach(doc => {
                        setRecipes(prevState =>
                            prevState.concat({
                                ...doc.data(),
                                id: doc.id,
                            })
                        );
                    });
                }

                setLoading(false);
            },
            err => {
                console.log(err);
                setError(err);
            }
        );

        return () => unsub();
    }, []);

    return (
        <div
            className={`${styles.home} ${
                modeColor === 'dark' ? styles.dark : ''
            }`}
        >
            {loading && <p className="loading">Loading...</p>}
            {error && <p className="error">{error.message}</p>}
            {!loading && !error && (
                <RecipeList
                    recipes={recipes}
                    onDeleteRecipe={deleteRecipeHandler}
                />
            )}
        </div>
    );
}
