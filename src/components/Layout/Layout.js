import React, {Component} from "react"
import Auxilian from "../../hoc/Auxilian";
import classes from "./Layout.css"
import Toolbar from "../Navigation/Toolbar/Toolbar"
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import {connect} from "react-redux"

class Layout extends Component {
  state={
    showSideDrawer : false
  }
  sideDrawerClosedHandler = ()=>{
    this.setState({showSideDrawer: false})
  }

  sideDrawerToggleHandler = () =>{
      this.setState((prevState)=>{
          return {showSideDrawer: !prevState.showSideDrawer}
      });
  }


  render() {
    return(
        <Auxilian>
          <Toolbar openBar={this.sideDrawerToggleHandler}
          isAuthenticated={this.props.isAuth}/>
          <SideDrawer closed={this.sideDrawerClosedHandler} open={this.state.showSideDrawer}
                      isAuthenticated={this.props.isAuth}/>
          <main className={classes.Content}>
            {this.props.children}
          </main>
        </Auxilian>
    )
  }
}

const mapStateToProps = state =>{
    return {
        isAuth: state.auth.token!==null
    }
}


export default connect(mapStateToProps)(Layout);

