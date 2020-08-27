import React, { useState } from 'react';
import {connect } from 'react-redux';
import Aux from '../Auxip/Auxilp';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const layout = props => {
    const [sideDrawerIsVisible, setSideDrawerisVisible] = useState(false);

    const sideDrawerClosedHandler = () => {
        setSideDrawerisVisible(false);
    }

    const sideDrawerToggleHandler = () => {
       setSideDrawerisVisible(!sideDrawerIsVisible);
    }

    
        return (
            <Aux>
                <Toolbar 
                isAuth={props.isAuthenticated}
                drawerToggleClicked={sideDrawerToggleHandler} />
                
                <SideDrawer
                isAuth={props.isAuthenticated}
                    open={sideDrawerIsVisible}
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    
}
const mapStateToProps = state => {
    return {
        isAuthenticated:state.auth.token !== null
    };
};
export default connect(mapStateToProps)(layout);