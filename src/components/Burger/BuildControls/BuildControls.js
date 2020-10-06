import React from "react"
import classes from "./BuildControls.css"
import BuildControl from "./BuildControl/BuildControl"
import button from "../../UI/Button/Button";

const controls =[
    {label: "Salad", type: "salad"},
    {label: "Bacon", type: "bacon"},
    {label: "Cheese", type: "cheese"},
    {label: "Meat", type: "meat"},
];


const buildControls =(props)=>(

    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl=>(
            <BuildControl key={ctrl.label}
                          label={ctrl.label}
                          adding={()=>props.addIngredient(ctrl.type)}
                          removeing={()=>props.removeIngredient(ctrl.type)}
                          disabled={props.disabled[ctrl.type]}/>
        ))}
        <button className={classes.OrderButton} disabled={!props.canPurchase} onClick={props.ordered}>
            {props.isAuthenticated? "ORDER NOW":"LogIn to Order"} </button>
    </div>
);

export default buildControls;