import React from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.css"
import Backdrop from "../../UI/Backdrop/Backdrop"
import Auxilian from "../../../hoc/Auxilian";
const sideDrawer= (props)=>{
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open){
        attachedClasses=[classes.SideDrawer, classes.Open]
    }

    return(
        <Auxilian>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(" ")}>
                <div className={classes.Logo} onClick={props.closed}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuth={props.isAuthenticated}/>
                </nav>
            </div>
        </Auxilian>
    );
}

export default sideDrawer;