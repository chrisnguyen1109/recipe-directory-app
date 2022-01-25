import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipeDetail from '../../components/RecipeDetail/RecipeDetail';
import useFirebaseFetch from '../../hooks/useFirebaseFetch';
import useThemeContext from '../../hooks/useThemeContext';
import styles from './Recipe.module.css';
import { getDetailRecipe } from '../../firebase/firebaseActions';

export default function Recipe() {
    const { recipeId } = useParams();
    const { loading, error, fetchData, setError } = useFirebaseFetch();
    const [recipe, setRecipe] = useState(null);
    const {
        state: { modeColor },
    } = useThemeContext();

    useEffect(() => {
        fetchData(getDetailRecipe(recipeId), response => {
            if (!response.exists()) {
                setError(new Error('No recipe found!'));
                return;
            }

            setRecipe({ id: recipeId, ...response.data() });
        });
    }, []);

    return (
        <div
            className={`${styles.recipe} ${
                modeColor === 'dark' ? styles.dark : ''
            }`}
        >
            {error && <p className="error">{error.message}</p>}
            {loading && <p className="loading">Loading...</p>}
            {recipe && <RecipeDetail recipe={recipe} />}
        </div>
    );
}
