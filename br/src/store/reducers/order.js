import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';


const initialState = {
    orders: [],
    loading: false,
    puchased: false,
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_START:
            return updateObject(state, { loading: true });
        case actionTypes.PURCHASE_BURGER_SUCESS:
            const newOrder = updateObject(action.orderData, { id: action.orderId });
            return updateObject(state, {
                loading: false,
                orders: state.orders.concat(newOrder),
                purchased: true
            });
        case actionTypes.PURCHASE_BURGER_FAIL:
            return updateObject(state, { loading: false });
        case actionTypes.PURCHASE_INIT:

        case actionTypes.FETCH_ORDERS_START:
            return updateObject(state, { loading: true });
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateObject(state, { loading: false, orders: action.orders });
        case actionTypes.FETCH_ORDRS_FAIL:
            return updateObject(state, { loading: false });
        default:
            return state;
    }
};

export default reducer