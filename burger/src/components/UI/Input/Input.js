import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElemet];

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
    }

    switch (props.inputtype) {
        case ('input'):
            inputElement = <input 
            className={inputClasses.join(' ')}
            {...props.elementConfig} 
            value={props.value} />;
            break;
        case ('textarea'):
            inputElement = <textarea  
            {...props.elementConfig} 
            value={props.value} />;
            break;
        case ('select'):
            inputElement = (
                <select
                    className={classes.InputElemet}
                    value={props.value}>
                    onChange={props.changed}
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );

        default:
            inputElement = <input {...props.elementConfig} value={props.value} />;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;