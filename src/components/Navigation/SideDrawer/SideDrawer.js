import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';

const sideDrawer = () => {

    return (
        <div className={classes.SideDrawer}>
            {/* As we need to adjust the logo size, we can pass the height we want as a prop to the Logo component
            or, as in here, we can grab the Logo component called into a div with its own Logo class in its own CSS file
            that has the desired height */}
            <div className={classes.Logo}>
                <Logo />
            </div>

            <nav>
                <NavigationItems />
            </nav>
        </div>
    );
};

export default sideDrawer; 