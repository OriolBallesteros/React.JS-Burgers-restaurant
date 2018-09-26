export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

//return {
//    ...state,
//    loading: true
//};
// =
//updateObject (state, {loading: true})