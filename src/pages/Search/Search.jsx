import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecipeList from '../../components/RecipeList/RecipeList';
import useFirebaseFetch from '../../hooks/useFirebaseFetch';
import { getRecipeByTitle } from '../../firebase/firebaseActions';

export default function Search() {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const query = queryParams.get('q');

    const { loading, error, fetchData } = useFirebaseFetch();
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetchData(getRecipeByTitle(query), response => {
            if (response.empty) {
                setRecipes([]);
                return;
            }

            response.docs.forEach(doc => {
                setRecipes(prevState =>
                    prevState.concat({
                        ...doc.data(),
                        id: doc.id,
                    })
                );
            });
        });
    }, [query]);

    return (
        <div>
            <h2 className="page-title">Recipes including "{query}"</h2>
            {error && <p className="error">{error}</p>}
            {loading && <p className="loading">Loading...</p>}
            {!loading && !error && <RecipeList recipes={recipes} />}
        </div>
    );
}
