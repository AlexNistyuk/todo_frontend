import React from "react";
import classes from "./Header.module.css";


function Header(props){
    return (
        <div className={classes.div} style={{
            borderTop: `${props.color} solid 4px`
        }}>
            <div className={classes.columnHeaderText}>
                {props.name}
            </div>
            <div className={classes.circle}>
                {props.number}
            </div>
        </div>
    )
}

export default Header;