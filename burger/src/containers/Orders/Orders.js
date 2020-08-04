const { Component } = require("react");

import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHanlder from '../../hoc/withErrorHandler/withErrorHandler';

class Order extends Component {
    state = {
        orders: [],
        loading: true,
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                const fetchhedOrders = [];
                for (let key in res.data) {
                    fetchhedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({ loading: false, orders: fetchhedOrders });
            })
            .catch(err => {
                this.setState({ loading: false });
            });
    }
    render() {
        return (
            <div>
                <Order />
                <Order />
            </div>
        );
    }
}

export default withErrorHanlder(Orders, axios);