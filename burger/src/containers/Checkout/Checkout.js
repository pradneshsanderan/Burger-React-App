import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state={
        ingredients:{
            salad:1,
            meat:1,
            cheese:1,
            bacon:1,
        }
    }
    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for(let param of query.entries()){
            ingredient[param[0]] = +param[1];
        }
        this.setState({ingredients: ingredients});
    }
    CheckoutCancelHandler = () => {
        this.props.history.goBack();
    }
    CheckoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        return(
            <div>
                <CheckoutSummary 
                CheckoutCancel={this.CheckoutCancelHandler}
                CheckoutContinued={this.CheckoutContinueHandler}
                ingredients={this.state.ingredients}/>
                <Route path={this.props.match.path + '/contact-data'} component={ContactData}
                redner={() => (<ContactData ingredient={this.state.ingredients} />)}/>
            </div>
        );
    }
}

export default Checkout;