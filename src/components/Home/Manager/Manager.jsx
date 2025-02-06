import React from "react";
import "./Manager.css";
import Navbar from "./Navbar/Navbar";
import Content from "./Content/Content";


function Manager(props){
    return (
        <div className="navigation-content-manager">
            <Navbar/>
            <Content state={props.state}/>
        </div>
    )
}

export default Manager;