import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
        },
        loading: false,
    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Pradnesh',
                address: {
                    street: 'Kovil Ulu',
                    ZipCode: '51100',
                    Country: 'Malaysia',

                },
                email: 'prad@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }
    render() {
        let form = (
            <form>
                <Input inputtype="input"  type="text" name="name" placeholder="Your Name" />
                <Input inputtype="input"  type="email" name="email" placeholder="Your Mail" />
                <Input inputtype="input"  type="text" name="street" placeholder="Street" />
                <Input inputtype="input"  type="text" name="Postal" placeholder="Postal Code" />
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
            </form>
        );
        if (this.state.loading) {
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

export default ContactData;