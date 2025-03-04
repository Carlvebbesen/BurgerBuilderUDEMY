import React, {Component} from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.css";
import * as action from "../../Store/actions/importFile";
import {connect} from "react-redux"
import Spinner from "../../components/UI/Spinner/Spinner";
import {Redirect} from "react-router-dom";


class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Email Address"
                },
                value: "",
                validation:{
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Password"
                },
                value: "",
                validation:{
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignup: true
    }
    componentDidMount() {
        if(!this.props.buildingBurger && this.props.authRedirectPath!=="/"){
            this.props.onSetRedirectPath()
        }
    }

    validationCheck(value, rules){
        let isValid = true;
        if(rules.required){
            isValid=value.trim() !== "" && isValid;
        }
        if(rules.minLength){
            isValid= value.length>=rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid=value.length<rules.maxLength && isValid;
        }
        if(rules.isEmail){
            const pattern = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            isValid = pattern.test(value) && isValid;
        }
        return isValid;
    }

    inputChangedHandler = (event, controlName) =>{
        const updatedControls = {
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.validationCheck(event.target.value, this.state.controls[controlName].validation),
                touched: true

            }
        };
        this.setState({controls: updatedControls})
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
    }

    switchAuthModeHandler = () =>{
        this.setState(prevState =>{
            return {isSignup: !prevState.isSignup}
        })
    }

    render() {
        const formElementTypeArray =[];
        for (let key in this.state.controls){
            formElementTypeArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let form = formElementTypeArray.map( formElement =>(
            <Input
            key={formElement.id}
            stringValue = {formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event)=>this.inputChangedHandler(event, formElement.id)}
            inValid={!formElement.config.valid}
            touched={formElement.config.touched}
            shouldValidate={formElement.config.validation}
            />
        ));
        if(this.props.loading){
            form= <Spinner/>;
        }
        let errorMessage = null;
        if(this.props.error){
            errorMessage=(<p>{this.props.error.message}</p>);
        }
        let authRedirect = null
        if(this.props.isAuth){
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }
        return(
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType={"Success"}>Submit</Button>
                </form>
                <Button btnType={"Danger"}
                    clicked={this.switchAuthModeHandler}>SWITCH TO {!this.state.isSignup ? "SIGN UP" : "LOGIN"}</Button>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch=>{
    return{
        onAuth: (email, password, isSignup) => dispatch(action.auth(email,password, isSignup)),
        onSetRedirectPath: () => dispatch(action.setAuthRedirectPath("/"))
    };
};

const mapStateToProps = state =>{
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);