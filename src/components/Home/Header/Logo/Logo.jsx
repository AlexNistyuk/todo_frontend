import React from "react";
import "./Logo.css";
import {NavLink} from "react-router-dom";

function Logo(){
    return (
        <NavLink to="/" className="dashboard-logo">
            <img alt="not found" src="https://logodix.com/logo/1691936.png"/>
        </NavLink>
    )
}

export default Logo;