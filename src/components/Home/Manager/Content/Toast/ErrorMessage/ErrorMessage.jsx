import React from "react";
import classes from "./ErrorMessage.module.css";


function ErrorMessage(props){
    return (
        <div className={classes.content}>
            <div className={classes.reason}>
                {props.reason}
            </div>
        </div>
    )
}

export default ErrorMessage;