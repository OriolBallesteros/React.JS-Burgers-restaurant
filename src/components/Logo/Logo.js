import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo}>
        {/* <img src={'../../assets/images/burger-logo.png'} />  --> it won't work as expectes
        cause once we set up the project to the server, the structure of the project will */}
        <img src={burgerLogo} alt={"MyBurger"} />
    </div>
);

export default logo; 