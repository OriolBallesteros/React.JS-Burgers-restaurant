import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../utility';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const addIngredient = (state, action) => {
    //{
    //    ...state,
    //    ingredients: updatedIngredients,
    //        //{
    //        //    ...state.ingredients,
    //        //    [action.ingredientName] : state.ingredients[action.ingredientName] + 1
    //        //    //  [] --> allow us to configure an object dynamically.                 
    //        //}, --> thanks to updateObject que can have a most clean code
    //    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    //}; --> thanks to updateObject que can have a most clean code; instead of returning all that is commented, que only need the updateObject as it is created. 

    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]

    }
    return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
    const updatedIngs = updateObject(state.ingredients, updatedIng);
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }

    return updateObject(state, updatedSt);
};

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        totalPrice: 4,
        error: false
    });
};

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, { error: true });
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);

        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);

        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
            
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);

        default: return state;
    }
};

export default reducer; 