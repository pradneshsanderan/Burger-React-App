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
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched: false,
            },
            street:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched: false,
            },
            ZipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your ZipCode'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:6,
                },
                valid:false,
                touched: false,
            },
            Country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched: false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                   optiona:[
                    {value: 'fastest', displayValue:'Fastest'},
                   {value: 'cheapest', displayValue:'cheapest'}]
                },
                value:'',
                valid: true,
                validation: {},
            },
        },
        formisValid:false,
        loading: false,
    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.state.totalPrice,
            orderData: formData

        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }
    checkValidity  (value, rules)  {

        let isValid = true;
        if(rules.required){
            isValid = value.trim() !=='' && isValid;
        }
        if(rules.minLength){
            isValid=value.length >= rules.minLength&& isValid;
        }
        if(rules.maxLength){
            isValid=value.length <= rules.maxLength&& isValid;
        }
        return isValid;
    }
    inputChangedHandler = (event, inputIndentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = { ...updatedOrderForm[inputIndentifier]}; 
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedOrderForm[inputIndentifier]= updatedFormElement;
        updatedFormElement.touched=true;
        const formIsValid =true;
        for(let inputIndentifier in updatedOrderForm){
            formIsValid=updatedOrderForm[inputIndentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formisValid: formIsValid});
    }
    render() {

        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit= {this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                    key={formElement.id} 
                    shouldValidate={formElement.config.validation}
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                ))}
                <Button btnType="Success" disabled={this.state.formisValid} clicked={this.orderHandler}>Order</Button>
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