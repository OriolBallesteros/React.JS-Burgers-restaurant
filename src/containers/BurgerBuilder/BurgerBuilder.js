import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

//const INGREDIENT_PRICES = {
//    salad: 0.5,
//    cheese: 0.4,
//    meat: 1.3,
//    bacon: 0.7
//};
//Used on reducer.js

class burgerBuilder extends Component {

    state = {
        /* ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }, */
        //Once we set the ingredients on the server, on the backEnd, we do not longer need this configuration here

        //ingredients: null,
        //Once the connect, and the mapStateToProps is set, we use that state, no longer this one. 
        //totalPrice: 4,
        //Same case as ingredients.
        //purchasable: false,
        //with the reducer and the function updatePurchaseState we agaoin no longer need it.
        purchasing: false,

        //loading: false,
        //error: false
        // --> not need of it here anymore. ../actions/burgerBuilder.js takes it. 
    }

    componentDidMount() {
    //    axios.get('https://react-burger-project-a8537.firebaseio.com/ingredients.json')
    //        .then(response => {
    //            this.setState({ ingredients: response.data });
    //        })
    //        .catch(error => {
    //            this.setState({ error: true });
    //        }); --> ../actions/burgerBuilder.js take care of this asynchronous
        this.props.onInitIngredients();
    } 

    updatePurchaseState(ingredients) {
        //const ingredients = {
        //    ...this.state.ingredients
        //};
        //As long as we use the state.ingredients, the state.purchasable won't change
        //seeing the clicked-just-added ingredient, but looking to the past state.
        //It gotta work with the just-added or just-removed ingredient, so we passed it as a paramater.


        const sum = Object.keys(ingredients)
            //Turn the object into an array
            .map(igKey => {
                return ingredients[igKey];
                //take the key of each one
            })
            .reduce((sum, el) => {
                return sum + el;
                //sum all the keys till none is left.
            }, 0);

        return sum > 0;
    }

//    addIngredientHandler = (type) => {
//        const oldCount = this.state.ingredients[type];
//        const updatedCount = oldCount + 1;
//        const updatedIngredients = {
//            ...this.state.ingredients
//        }
//        updatedIngredients[type] = updatedCount;
//
//        const priceAddition = INGREDIENT_PRICES[type];
//        const oldPrice = this.state.totalPrice;
//        const newPrice = oldPrice + priceAddition;
//
//        this.setState({
//            ingredients: updatedIngredients,
//            totalPrice: newPrice
//        });
//
//        this.updatePurchaseState(updatedIngredients);
//    }
//
//removeIngredientHandler = (type) => {
//    const oldCount = this.state.ingredients[type];
//    if (oldCount <= 0) {
//        return;
//    }
//    const updatedCount = oldCount - 1;
//    const updatedIngredients = {
//        ...this.state.ingredients
//    }
//    updatedIngredients[type] = updatedCount;
//
//    const priceDeduction = INGREDIENT_PRICES[type];
//    const oldPrice = this.state.totalPrice;
//    const newPrice = oldPrice - priceDeduction;
//
//    this.setState({
//        ingredients: updatedIngredients,
//        totalPrice: newPrice
//    });
//
//    this.updatePurchaseState(updatedIngredients);
//}
// --> These two functions were managing the state.ingredients and the state.totalPrice. Once the reducer manage those already, we do not need these functions anymore. 

    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({ purchasing: true });
        }else{
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }
    //Simple reminder: the sintax 'purchaseHandler(){...} will report an error because it won't read
    //the 'this'. That's why is a good idea to use ES6, arrow function, which solves it.

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        //const queryParams = [];
        //for (let i in this.state.ingredients) {
        //    queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i])); /* encodeURIComponent = transform string, int... into valid URL */
        //}
        //queryParams.push('price=' + this.state.totalPrice);
        //const queryString = queryParams.join('&');
        //
        //this.props.history.push({
        //    pathname: '/checkout',
        //    search: '?' + queryString
        //});
        //--> With redux there's no need of query to pass info. Redux those it.
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            //...this.state.ingredients --> no longer used due to mapStateToProps
            ...this.props.ings
        };
        //We transform the key of a copy of the state.ingredients into a boolean;
        //true if there is 1 or more; false if it's 0. With that we can now able and
        //disable the button of 'Less', according to it. 
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null; /* As long as it uses ingredients might be under the condition of ingredients as true */
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        if (this.props.ings) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onRemoveIngredient}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                        price={this.props.price} />
                </Auxiliary>
            );

            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />
        }

        //if (this.state.loading) {
        //    orderSummary = <Spinner />
        //} --> burgerBuilder.js in actions folder

        return (
            <Auxiliary>
                {/* We do check de workFlow: willComponentUpdate, etc... on both Modal and 
                OrderSummary Components due to one grabs the other inside */}
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>

                {burger}
                {/*<Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice} />*/}
                {/*The structure of the state.ingredients since we passed it to the backend. Now every component that use ingredients might be only rendered under conditional */}

            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingrName) => dispatch(actions.addIngredient(ingrName)),
        onRemoveIngredient: (ingrName) => dispatch(actions.removeIngredient(ingrName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios)); 