import { Link, useNavigate } from 'react-router-dom';
import styles from './RecipeItem.module.css';
import useThemeContext from '../../hooks/useThemeContext';
import deleteIcon from '../../assets/delete.svg';
import editIcon from '../../assets/edit.svg';

export default function RecipeItem({ recipe, onDeleteRecipe }) {
    const {
        state: { modeColor },
    } = useThemeContext();
    const navigate = useNavigate();

    const deleteRecepiHandler = () => {
        if (window.confirm('Do you really want to delete this recipe?')) {
            onDeleteRecipe(recipe.id);
        }
    };

    return (
        <div
            key={recipe.id}
            className={`${styles.card} ${
                modeColor === 'dark' ? styles.dark : ''
            }`}
        >
            <h3>{recipe.title}</h3>
            <p>{recipe.cookingTime} to make.</p>
            <div>{recipe.method.substring(0, 100)}...</div>
            <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
            <img
                className={styles['edit-icon']}
                src={editIcon}
                alt="edit icon"
                onClick={() => navigate(`/edit/${recipe.id}`)}
            />
            <img
                className={styles['delete-icon']}
                src={deleteIcon}
                alt="delete icon"
                onClick={deleteRecepiHandler}
            />
        </div>
    );
}
