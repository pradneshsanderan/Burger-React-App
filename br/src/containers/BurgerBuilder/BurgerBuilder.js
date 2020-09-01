import React, { useState, useEffect, useCallback } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

import Aux from '../../hoc/Auxip/Auxilp';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';
import axios from '../../axios-orders';

const burgerBuilder = props => {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }

    const [purchasing, setPurchasing] = useState(false);
    const dispatch = useDispatch();
    const onIngredientAdded = (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName));
    const onIngredientRemoved = (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName));
    const onInitIngredients = useCallback(() => dispatch(burgerBuilderActions.initIngredients()),[dispatch]);
    const onInitPurchase = () => dispatch(burgerBuilderActions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));
    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const ings = useSelector(state => {
        return state.burgerBuilder.ingredients;
    });
    co = useSelector(state => {
        return state.burgerBuilder.totalPrice;
    });
    const error = useSelector(state => {
        return state.burgerBuilder.error;
    });
    const isAuthenticated = useSelector(state => {
        return state.burgerBuilder.isAuthenticated;
    });

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    const purchaseHandler = () => {
        if (isAuthenticated) {
            setPurchasing(true);
        } else {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }

    }

    const constpurchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    }


    const disabledInfo = {
        ...ings
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;
    let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

    if (ings) {
        burger = (
            <Aux>
                <Burger ingredients={this.ings} />
                <BuildControls
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={updatePurchaseState(ings)}
                    ordered={purchaseHandler}
                    price={price}
                    isAuth={isAuthenticated} />
            </Aux>
        );
        orderSummary = <OrderSummary
            ingredients={ings}
            price={price}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler} />;
    }
    // {salad: true, meat: false, ...}
    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );

}



export default withErrorHandler(burgerBuilder, axios) ;