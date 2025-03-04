import React, { Component } from 'react';
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import {Route, Switch, withRouter, Redirect} from "react-router-dom";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import {connect} from "react-redux"
import * as action from "./Store/actions/importFile";

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }


    render() {
        let routes = (
            <Switch>
                <Route path={"/auth"} component={Auth}/>
                <Route path={"/"} exact component={BurgerBuilder}/>
                <Redirect to={"/"}/>
            </Switch>
        );
        if(this.props.isAuth){
            routes =(
                <Switch>
                    <Route path={"/checkout"} component={Checkout}/>
                    <Route path={"/orders"} component={Orders}/>
                    <Route path={"/logout"} component={Logout}/>
                    <Route path={"/auth"} component={Auth}/>
                    <Route path={"/"} exact component={BurgerBuilder}/>
                    <Redirect to={"/"}/>
                </Switch>
            );
        }
    return (
         <div>
             <Layout>
                 {routes}
             </Layout>

         </div>
    );
  }
}
const mapDispatchToProps = dispatch =>{
    return{
        onTryAutoSignup: () => dispatch(action.authCheckState())
    }
}

const mapStateToProps = state =>{
    return{
        isAuth: state.auth.token !== null
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
