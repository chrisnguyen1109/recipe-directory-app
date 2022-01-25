import useThemeContext from '../../hooks/useThemeContext';
import RecipeItem from '../RecipeItem/RecipeItem';
import styles from './RecipeList.module.css';

export default function RecipeList({ recipes, onDeleteRecipe }) {
    const { state } = useThemeContext();

    return (
        <div
            className={`${styles['recipe-list']} ${
                state.modeColor === 'dark' ? styles.dark : ''
            }`}
        >
            {recipes.length === 0 && (
                <p className={styles.notfound}>No data fond!</p>
            )}
            {recipes.map(recipe => (
                <RecipeItem
                    key={recipe.id}
                    recipe={recipe}
                    onDeleteRecipe={onDeleteRecipe}
                />
            ))}
        </div>
    );
}
