import { Fragment, useEffect, useState } from 'react';
import useInput from '../../hooks/useInput';
import useThemeContext from '../../hooks/useThemeContext';
import styles from './RecipeForm.module.css';
import useFirebaseFetch from '../../hooks/useFirebaseFetch';
import { getDetailRecipe } from '../../firebase/firebaseActions';
import { useNavigate } from 'react-router-dom';

const isNotEmpty = value => value.trim() !== '';

export default function RecipeForm({
    recipeId,
    loading,
    onCreateRecipe,
    error,
}) {
    const [ingredients, setIngredients] = useState([]);
    const {
        state: { modeColor, navColor },
    } = useThemeContext();

    const {
        value: title,
        inputValid: titleValid,
        hasError: titleError,
        changeInputHandler: changeTitle,
        blurInputHandler: blurTitle,
        resetInputHandler: resetTitle,
    } = useInput(isNotEmpty);

    const {
        value: newIngredient,
        inputValid: newIngredientValid,
        hasError: newIngredientError,
        changeInputHandler: changeNewIngredient,
        blurInputHandler: blurNewIngredient,
        resetInputHandler: resetNewIngredient,
    } = useInput(isNotEmpty);

    const {
        value: method,
        inputValid: methodValid,
        hasError: methodError,
        changeInputHandler: changeMethod,
        blurInputHandler: blurMethod,
        resetInputHandler: resetMethod,
    } = useInput(isNotEmpty);

    const {
        value: cookingTime,
        inputValid: cookingTimeValid,
        hasError: cookingTimeError,
        changeInputHandler: changeCookingTime,
        blurInputHandler: blurCookingTime,
        resetInputHandler: resetCookingTime,
    } = useInput(isNotEmpty);

    const { loading: loadingRecipe, fetchData } = useFirebaseFetch();
    const navigate = useNavigate();

    useEffect(() => {
        if (recipeId) {
            fetchData(getDetailRecipe(recipeId), response => {
                if (!response.exists()) {
                    navigate('/create', { replace: true });
                    return;
                }

                const recipeData = response.data();

                changeTitle(recipeData.title);
                setIngredients(recipeData.ingredients);
                changeMethod(recipeData.method);
                changeCookingTime(
                    parseFloat(recipeData.cookingTime).toString()
                );
            });
        }
    }, [recipeId]);

    const formValid =
        titleValid && methodValid && cookingTimeValid && ingredients.length > 0;

    const addIngredient = () => {
        if (!newIngredientValid) return;

        setIngredients(prevState => {
            return [...new Set(prevState.concat(newIngredient))];
        });

        resetNewIngredient();
    };

    const removeIngredient = ingredient => {
        setIngredients(prevState => {
            return prevState.filter(el => el !== ingredient);
        });
    };

    const submitHandler = e => {
        e.preventDefault();

        if (!formValid) return;

        onCreateRecipe(
            {
                title,
                ingredients,
                method,
                cookingTime: cookingTime + ' minutes',
            },
            () => {
                resetTitle();
                resetMethod();
                resetCookingTime();
            }
        );
    };

    return (
        <form
            className={`${styles['create-form']} ${
                modeColor === 'dark' ? styles.dark : ''
            }`}
            onSubmit={submitHandler}
        >
            <label>
                <span>Recipe title:</span>
                <input
                    type="text"
                    onChange={e => changeTitle(e.target.value)}
                    onBlur={e => blurTitle(e.target.value)}
                    value={title}
                />
                {titleError && (
                    <p className={styles['text-error']}>Please enter a title</p>
                )}
            </label>

            <label>
                <span>Recipe Ingredients:</span>
                <div className={styles.ingredients}>
                    <input
                        type="text"
                        onChange={e => changeNewIngredient(e.target.value)}
                        onBlur={e => blurNewIngredient(e.target.value)}
                        value={newIngredient}
                    />
                    <button
                        type="button"
                        style={{ background: navColor }}
                        onClick={addIngredient}
                    >
                        Add
                    </button>
                </div>
                {newIngredientError && ingredients.length === 0 && (
                    <p className={styles['text-error']}>
                        Please enter an ingredient
                    </p>
                )}
            </label>
            <p>
                Current ingredients:{' '}
                {ingredients.map(el => (
                    <Fragment key={el}>
                        <em
                            style={{ borderBlockColor: navColor }}
                            onClick={() => removeIngredient(el)}
                        >
                            {el}
                        </em>
                        <span>, </span>
                    </Fragment>
                ))}
            </p>

            <label>
                <span>Recipe Method:</span>
                <textarea
                    rows="4"
                    onChange={e => changeMethod(e.target.value)}
                    onBlur={e => blurMethod(e.target.value)}
                    value={method}
                />
                {methodError && (
                    <p className={styles['text-error']}>
                        Please enter a method
                    </p>
                )}
            </label>

            <label>
                <span>Cooking time (minutes):</span>
                <input
                    type="number"
                    onChange={e => changeCookingTime(e.target.value)}
                    onBlur={e => blurCookingTime(e.target.value)}
                    value={cookingTime}
                />
                {cookingTimeError && (
                    <p className={styles['text-error']}>
                        Please enter cooking time
                    </p>
                )}
            </label>

            <button
                disabled={!formValid || loading || loadingRecipe}
                style={{ background: navColor }}
            >
                {loading || loadingRecipe ? 'Loading...' : 'Submit'}
            </button>
            {error && <p className={styles['text-error']}>{error.message}</p>}
        </form>
    );
}
