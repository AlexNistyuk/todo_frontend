import React from "react";
import classes from "./ErrorMessage.module.css";


function ErrorMessage(props){
    return (
        <div className={classes.content}>
            <div className={classes.header}>
                {props.state.truncate(props.header, props.state.maxToastHeader)}
            </div>
            <div className={classes.reason}>
                {`Reason: ${props.reason.toLowerCase()}`}
            </div>
        </div>
    )
}

export default ErrorMessage;