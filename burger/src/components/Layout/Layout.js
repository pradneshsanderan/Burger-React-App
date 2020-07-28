import React, { Component } from 'react';
import Aux from '../../hoc/Auxip/Auxilp';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSide:true,
    }
    
    SideDrawerClosedHandler = () => {
        this.setState({showSide:false})
    }

    SideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSide: !prevState.showSide};
        });
    }


    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.SideDrawerToggleHandler}/>
                <SideDrawer open={this.state.showSide} closed={this.SideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;