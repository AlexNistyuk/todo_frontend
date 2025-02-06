import React from "react";
import classes from "./SuccessMessage.module.css";


function SuccessMessage(props){
    let eventTextColor = props.color ? props.color: props.state.successToastColor;

    return (
        <div className={classes.content}>
            <div className={classes.header}>
                {props.state.truncate(props.header, props.state.maxToastHeader)}
            </div>
            <div className={classes.event} style={{color: eventTextColor}}>
                {props.event.toUpperCase()}
            </div>
        </div>
    )
}

export default SuccessMessage;