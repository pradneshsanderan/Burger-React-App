import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';


class Checkout extends Component {
    state={
        ingredients:{
            salad:1,
            meat:1,
            cheese:1,
            bacon:1,
        }
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
            </div>
        );
    }
}

export default Checkout;