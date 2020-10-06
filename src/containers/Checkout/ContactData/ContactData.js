import React, {Component} from "react";
import classes from "./ContactData.css";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import {connect} from "react-redux";
import axios from "./../../../axios-orders";
import withErrorHandler from "./../../../components/UI/WithErrorHandler/WithErrorHandler"
import * as action from "../../../Store/actions/importFile";

class ContactData extends Component{
    state = {
        orderForm:{
                name: {
                    elementType: "input",
                    elementConfig: {
                        type: "text",
                        placeholder: "Your name"
                    },
                    value: "",
                    validation:{
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                    street: {
                        elementType: "input",
                        elementConfig: {
                            type: "text",
                            placeholder: "Street"
                        },
                        value: "",
                        validation:{
                            required: true
                        },
                        valid: false,
                        touched: false
                    },
                    zipCode: {
                        elementType: "input",
                        elementConfig: {
                            type: "text",
                            placeholder: "Zip-Code"
                        },
                        value: "",
                        validation:{
                            required: true,
                            minLength: 3,
                            maxLength:5
                        },
                        valid: false,
                        touched: false
                    },
                    country: {
                        elementType: "input",
                        elementConfig: {
                            type: "text",
                            placeholder: "Your Country"
                        },
                        value: "",
                        validation:{
                            required: true
                        },
                        valid: false,
                        touched: false
                    },
                email: {
                    elementType: "input",
                    elementConfig: {
                        type: "email",
                        placeholder: "Your Email"
                    },
                    value: "",
                    validation:{
                        required: true
                    },
                    valid: false,
                    touched: false
                },
            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        {value: "fastest", displayValue: "Fastest"},
                        {value: "cheapest", displayValue: "Cheapest"}]
                },
                value: "fastest",
                validation:{},
                valid: true
            },
        },
        formIsValid: false
    };
    orderHandler =(event)=>{
        event.preventDefault();
        const orderFormData= {};
        for (let orderDataID in this.state.orderForm){
            orderFormData[orderDataID]=this.state.orderForm[orderDataID].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: orderFormData,
            userId: this.props.userId
        }
        this.props.onBurgerStart(order, this.props.token);
    }

    validationCheck(value, rules){
        let isValid = true;
        if(rules.required){
            isValid=value.trim() !== "" && isValid;
        }
        if(rules.minLength){
            isValid= value.length>rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid=value.length<rules.maxLength && isValid;
        }
        return isValid;
    }

    inputChangedHandler=(event,inputID)=>{
        const updatedState= {...this.state.orderForm};
        const updatedStateElement= {...updatedState[inputID]}

        updatedStateElement.value= event.target.value;
        updatedStateElement.valid = this.validationCheck(updatedStateElement.value, updatedStateElement.validation)
        updatedStateElement.touched=true;
        updatedState[inputID]=updatedStateElement;

        let formIsValid=true;
        for (let inputId in updatedState){
            formIsValid= updatedState[inputId].valid && formIsValid;
        }
        this.setState({orderForm: updatedState, formIsValid: formIsValid})
    }

    render() {
        let formElementTypeArray =[];
        for (let key in this.state.orderForm){
            formElementTypeArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form =(<form onSubmit={this.orderHandler}>
            {formElementTypeArray.map(formElement=>{
                return(<Input
                       key={formElement.id}
                    stringValue = {formElement.id}
                           elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event)=>this.inputChangedHandler(event, formElement.id)}
                inValid={!formElement.config.valid}
                    touched={formElement.config.touched}
                shouldValidate={formElement.config.validation}/>)
            })}
            <Button disabled={!this.state.formIsValid} btnType={"Success"}>ORDER</Button>
        </form>);
        if (this.props.loading){
            form= <Spinner/>
        }
        return(
            <div className={classes.ContactData}>
                <h4> Enter your contact data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps= state =>{
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onBurgerStart: (orderData,token) => dispatch(action.purchaseBurger(orderData,token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));