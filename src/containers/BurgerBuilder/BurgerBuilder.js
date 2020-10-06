import React, {Component} from "react"
import Auxilian from "../../hoc/Auxilian";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import Spinner from "../../components/UI/Spinner/Spinner"
import withErrorHandler from "../../components/UI/WithErrorHandler/WithErrorHandler";
import * as burgerBuilderActions from "../../Store/actions/importFile";
import {connect} from "react-redux";
import axios from "../../axios-orders"


class BurgerBuilder extends Component {
    state = {
         orderClicked: false
    }

    orderClickedHandler = () => {
        if(this.props.isAuth){
            this.setState({orderClicked: true})
        } else {
            this.props.onSetAuthRedirectPath("/checkout")
            this.props.history.push("/auth")
        }
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(igkey => {
            return ingredients[igkey]
        })
            .reduce((sum, el) => sum + el, 0);
        return sum > 0;
    }

  /*  addingIngredient = (type) => {
        const newCount = this.state.ingredients[type] + 1;
        const newState = {...this.state.ingredients};
        newState[type] = newCount;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({ingredients: newState, totalPrice: newPrice})
        this.updatePurchaseState(newState);
    }

    removingIngredient = (type) => {
        if (this.state.ingredients[type] <= 0) {
            return;
        }
        const newCount = this.state.ingredients[type] - 1;
        const newState = {...this.state.ingredients};
        newState[type] = newCount;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({ingredients: newState, totalPrice: newPrice})
        this.updatePurchaseState(newState);

    };
*/
    purchaseCancelHandler = () => {
        this.setState({orderClicked: false})
    }

    purchaseContinueHandler = () => {
        //alert("you continue :O")

        /*const queryParams = [];

        for (let i in this.state.ingredients) {
            queryParams.push(encodeURI(i) + "=" + encodeURI(this.state.ingredients[i]))
        }
        queryParams.push("price=" + this.state.totalPrice)
        const queryString = queryParams.join("&")*/
        this.props.onInitPurchased();
        this.props.history.push("/checkout");

    }

    componentDidMount() {
        this.props.onInitIngredient();
    }

    render()
        {
            let disabledInfo = {
                ...this.props.ings
            };
            for (let key in disabledInfo) {
                disabledInfo[key] = disabledInfo[key] <= 0;
            }
            let ordersummary = null;
            let burger = this.props.error ? <p>Could'nt get the ingredients from the server</p> : <Spinner/>;

            if (this.props.ings) {
                burger = (<Auxilian>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        isAuthenticated={this.props.isAuth}
                        addIngredient={this.props.onIngredientAdded}
                        removeIngredient={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        canPurchase={this.updatePurchaseState(this.props.ings)}
                        ordered={this.orderClickedHandler}/>
                </Auxilian>);
                ordersummary = <OrderSummary
                    price={this.props.price}
                    purchaseContinue={this.purchaseContinueHandler}
                    purchaseCancel={this.purchaseCancelHandler}
                    ingredients={this.props.ings}/>

            }

            return (
                <Auxilian>

                    <Modal show={this.state.orderClicked} modalClosed={this.purchaseCancelHandler}>
                        {ordersummary}
                    </Modal>
                    {burger}
                </Auxilian>
            );
        }
}
const mapStateToProps = state =>{
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token!==null
    }}
const mapDispatchToProps = dispatch =>{
    return{
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredient: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchased: () => dispatch(burgerBuilderActions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));