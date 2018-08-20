import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    //With JS provided 'Object.keys' we then got an array with the keys of the object passed
    let transformedIngredients = Object.keys(props.ingredients)
        //a normal map = for each ingredient in the state.MediaKeySession...
        .map(igKey => {
            //as long as a only once named ingredient could be repeated several times
            //we do build an array of whatever with as much elements as times the ingredient is repeated
            return [...Array(props.ingredients[igKey])]
                //And THEN, when we do know how many times is each ingredient,
                //we do call the BurgerIngredient component (with an unique key, of course)
                //and the essential 'type' definition
                .map((_, i) => {
                    return <BurgerIngredient key={igKey + i} type={igKey} />
                });
        })
        //with reduce() 
        .reduce((givenArray, el) => {
            return givenArray.concat(el)
        }, []);

    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {/* <BurgerIngredient type="cheese" />
            <BurgerIngredient type="meat" /> */}
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />                      
        </div>
    );
};

export default burger; 