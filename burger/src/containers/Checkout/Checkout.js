import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';


class Checkout extends Component {
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
                ingredients={this.props.ings}/>
                <Route path={this.props.match.path + '/contact-data'} component={ContactData}
                component={ContactData}/>
            </div>
        );
    }
}

const mapStateToProps =state => {
 return{
     ings: state.ingredients,
 }
};

export default connect(mapStateToProps)( Checkout);