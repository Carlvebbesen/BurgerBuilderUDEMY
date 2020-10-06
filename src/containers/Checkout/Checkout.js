import React, {Component} from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route, Redirect} from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import {connect} from "react-redux";

class Checkout extends Component{

    CheckoutContinueHandler=()=>{
        this.props.history.replace("/checkout/contact-data")
    }

    CheckoutCancelHandler= () =>{
        this.props.history.goBack();

    }

    render() {
        let summary = <Redirect to={"/"}/>;
        if(this.props.ings){
            const redirect = this.props.purchased ?<Redirect to={"/"}/>: null
             summary = (
                    <div>
                        {redirect}
                        <CheckoutSummary ingredients={this.props.ings}
                                         checkoutCancel={this.CheckoutCancelHandler}
                                         checkoutContinue={this.CheckoutContinueHandler}/>
                        <Route path={this.props.match.path+"/contact-data"} component={ContactData}/>
                    </div>
        )
        }
        return summary;
    }
}

 const mapStateToProps = state =>{
    return{
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
 }

export default connect(mapStateToProps)(Checkout);