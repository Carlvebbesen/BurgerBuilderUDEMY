import React ,{Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import * as action from "../../../Store/actions/importFile"

class Logout extends Component{
    componentDidMount() {
        this.props.onLogout();
    }


    render() {
        return(
            <Redirect to={"/"}/>
        )
    }
}

const mapDispatchToProps= dispatch =>{
    return{
        onLogout: () => dispatch(action.logout())
    }
}
export default connect(null,mapDispatchToProps)(Logout);