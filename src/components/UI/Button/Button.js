import React from 'react';
import classes from './Button.css';

const button = (props) => (
    <button 
        //We have a general style for buttons (.Button) but also an extra ones (.Success and .Danger)
        //that we can pass dinamically as easy as using an Array an then transforming into a String
        //and with the power of 'props'
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked}>{props.children}</button>
);

export default button; 