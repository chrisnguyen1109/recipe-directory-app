import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RecipeForm from '../../components/RecipeForm/RecipeForm';
import useFirebaseFetch from '../../hooks/useFirebaseFetch';
import styles from './Create.module.css';
import useThemeContext from '../../hooks/useThemeContext';
import { addRecipe, updateRecipe } from '../../firebase/firebaseActions';

export default function Create() {
    const { loading, status, error, fetchData, setError } = useFirebaseFetch();
    const navigate = useNavigate();
    const { recipeId } = useParams();
    const {
        state: { modeColor },
    } = useThemeContext();

    const createRecipeHandler = async (data, callback) => {
        if (recipeId) {
            fetchData(updateRecipe(recipeId, data), callback);

            return;
        }

        fetchData(addRecipe(data), response => {
            if (!response.id) {
                setError(new Error('Some thing went wrong!'));
                return;
            }

            callback();
        });
    };

    useEffect(() => {
        if (status === 'success') {
            navigate('/', { replace: true });
        }
    }, [status]);

    return (
        <div className={styles.create}>
            <h2 className={`page-title ${modeColor}`}>Add a New Recipe</h2>
            <RecipeForm
                recipeId={recipeId}
                loading={loading}
                onCreateRecipe={createRecipeHandler}
                error={error}
            />
        </div>
    );
}
