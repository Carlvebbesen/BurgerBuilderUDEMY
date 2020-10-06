import React from "react";
import Auxilian from "../../../hoc/Auxilian";
import Button from "./../../UI/Button/Button"

const orderSummary=(props)=>{
    const ingredientSummary = Object.keys(props.ingredients).map(igkey=>{
        return(
          <li key={igkey}>{igkey}: {props.ingredients[igkey]}</li>
        );
    })
        return(
    <Auxilian>
        <h3>Your Order</h3>
    <p>A delicious burger with the following ingredients:</p>
    <ul>
        {ingredientSummary}
    </ul>
        <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={props.purchaseCancel}>CANCEL</Button>
        <Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
        </Auxilian>

)}

export default orderSummary;