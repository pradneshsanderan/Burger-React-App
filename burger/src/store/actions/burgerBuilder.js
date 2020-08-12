import * as actionTypes from './actionTypes';


export const addIngredient = (name) => {
return {
    type : actionTypes.ADD_INGREDIENTS,
    ingredietName: name,
}
};

export const removeIngredient = (name) => {
    return {
        type : actionTypes.REMOVE_INGREDIENTS,
        ingredietName: name,
    }
    };