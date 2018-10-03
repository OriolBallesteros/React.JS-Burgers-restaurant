import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import axios from '../../../axios-orders';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your e-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false
        //loading: false --> take it from here, now used in the reducer
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        //What to send to the server
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId

        }

        //Post method to the server
        //axios.post('/orders.json', order)
        //    .then(response => {
        //        console.log(response);
        //        this.setState({ loading: false });
        //        this.props.history.push('/');
        //    })
        //    .catch(error => {
        //        console.log(error);
        //        this.setState({ loading: false });
        //    });
        // --> on the order.js on action folder now
        this.props.onOrderBurger(order, this.props.token);
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (!rules) {
            return true;
        }
        //without this if statement, or without the 'validation: {}' in the state.deliveryMethod, the select will always report an error because then we will be passing it with a param in a function which would be undefined

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        //For every object in a state, we need to go deeper into the 'clonning' process to achieve a correct 'clonning' (not taking the same spot)
        //That's why we take the entire state:
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        //Then, we need to enter into the object we really want to change.
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        //As long as it is the value, we do not need to go deeper. If it was the elementConfig, an object itself, we would need to go one more level.

        //Now that we are down we change the value,
        updatedFormElement.value = event.target.value;

        //(We also add the validation)
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);

        //(we only want the red input on the selected ones)
        updatedFormElement.touched = true;

        //and we sent it up,
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        console.log(updatedFormElement);

        //Checking if the entire form is valid
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        //and once it is ready, we use the setState. 
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });

    }

    render() {

        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement =>
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />)}

                <Button btnType='Success'
                    clicked={this.orderHandler}
                    disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));