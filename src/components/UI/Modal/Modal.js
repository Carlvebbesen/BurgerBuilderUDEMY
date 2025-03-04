import React from "react";
import classes from "./Modal.css";
import Auxilian from "../../../hoc/Auxilian";
import Backdrop from "../Backdrop/Backdrop";

const modal =(props)=>(
   <Auxilian>
       <Backdrop show={props.show} clicked={props.modalClosed}/>
    <div className={classes.Modal}
    style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.show ? "1":":"
    }}
    >
        {props.children}
    </div>
   </Auxilian>
);

export default modal;