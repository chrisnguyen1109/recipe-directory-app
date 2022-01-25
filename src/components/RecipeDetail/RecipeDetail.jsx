import styles from './RecipeDetail.module.css';
import useThemeContext from '../../hooks/useThemeContext';
import { Link } from 'react-router-dom';

export default function RecipeDetail({ recipe }) {
    const { state } = useThemeContext();

    return (
        <div className={styles['recipe-detail']}>
            <h2 className={`page-title ${state.modeColor}`}>{recipe.title}</h2>
            <p>Takes {recipe.cookingTime} to cook.</p>
            <ul>
                {recipe.ingredients.map(ing => (
                    <li key={ing}>{ing}</li>
                ))}
            </ul>
            <p className={styles.method}>{recipe.method}</p>
            <Link to={`/edit/${recipe.id}`}>Edit Recipe</Link>
        </div>
    );
}
