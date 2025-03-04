import React from "react";
import classes from "./Input.css"

const input =(props) =>{

    let inputElement=null;
    const inputClasses =[classes.InputElement]

    if(props.inValid && props.shouldValidate&& props.touched){
        inputClasses.push(classes.Invalid)
    }


    switch (props.elementType) {
        case ("input"):
            inputElement=<input  className={inputClasses.join(" ")}
                                 {...props.elementConfig} value={props.value} onChange={props.changed}/>
            break;
        case ("textarea"):
            inputElement=<textarea className={inputClasses.join(" ")}
                                   {...props.elementConfig} value={props.value} onChange={props.changed}/>
            break;
        case("select"):
            inputElement=(<select
            className={inputClasses.join(" ")}
            value={props.value} onChange={props.changed}>
                {props.elementConfig.options.map(option=><option value={option.value} key={option.value}>
                    {option.displayValue}
                    </option>
                )}
            </select>);
            break;
        default:
            inputElement=<input  className={inputClasses.join(" ")}
                                 {...props.elementConfig} value={props.value} onChange={props.changed}/>
    }
    let ErrorMessage = null;
    if(props.inValid && props.touched){
        ErrorMessage =<p className={classes.ValidationError}>Please enter a valid {props.stringValue}</p>
    }

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {ErrorMessage}
        </div>
    );
}

export default input