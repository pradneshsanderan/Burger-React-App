import React from 'react';
import navigationItems from '../NavigationItems';
import classes from './NavigationItem.css'
import { checkPropTypes } from 'prop-types';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <a href={props.link} 
        className={props.active? classes.active : null}>
            {props.children}
        </a>
    </li>
);

export default navigationItem;