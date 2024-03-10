import React from "react";
import "./Item.css";
import {NavLink} from "react-router-dom";

function Item(props){
    return (
        <NavLink to={props.path} className="navigation-item">
            <img alt="not found" src={props.image}/>
            <div className="navigation-item-text">{props.text}</div>
        </NavLink>
    )
}

export default Item;