import React, { Component } from 'react';
import Aux from '../../hoc/Auxilp';
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


    render() {
        return (
            <Aux>
                <Toolbar />
                <SideDrawer open={this.state.showSide}closed={this.SideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;