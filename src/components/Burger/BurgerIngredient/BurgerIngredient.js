import React, { Component }from 'react';
import classes from './burgerIngredient.css';
import PropTypes from 'prop-types';

class BurgerIngredient extends Component {
    render(){

        let ingredient = null; 

        switch(this.props.type){
            case ('bread-bottom'):
                ingredient = <div className={classes.BreadBottom}></div>;
                break; 
    
            case ('bread-top'):
                ingredient = (
                    <div className = {classes.BreadTop}>
                        <div className = {classes.Seeds1}></div>
                        <div className = {classes.Seeds2}></div>
                    </div>
                );
                break; 
    
            case ('meat'):
                ingredient = <div className = {classes.Meat}></div>
                break; 
            
            case('cheese'):
                ingredient = <div className = {classes.Cheese}></div>
                break;
    
            case('bacon'):
                ingredient = <div className = {classes.bacon}></div>
                break;
    
            case('salad'):
                ingredient = <div className = {classes.Salad}></div>
                break;
            
            default:
                ingredient = null;
        }

        return ingredient; 
    }

}

BurgerIngredient.PropTypes = {
    type: PropTypes.string.isRequired
}

export default burgerIngredient; 

//It started as a function-component, a stateless component. 
//As long as we need the prop-types we do transform it to a stateful component, with the necessary changes:
// props --> this.props; all inside render function.