import {
    collection,
    addDoc,
    getDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
    query,
    where,
} from 'firebase/firestore';
import db from './config';

export const addRecipe = recipe => {
    return addDoc(collection(db, 'recipes'), recipe);
};

export const getAllRecipe = () => {
    return getDocs(collection(db, 'recipes'));
};

export const getDetailRecipe = id => {
    const recipeRef = doc(db, 'recipes', id);

    return getDoc(recipeRef);
};

export const getRecipeByTitle = title => {
    const q = query(
        collection(db, 'recipes'),
        where('title', '>=', title),
        where('title', '<=', title + '\uf8ff')
    );

    return getDocs(q);
};

export const deleteRecipe = id => {
    return deleteDoc(doc(db, 'recipes', id));
};

export const updateRecipe = (id, recipe) => {
    const recipeRef = doc(db, 'recipes', id);
    return updateDoc(recipeRef, recipe);
};
