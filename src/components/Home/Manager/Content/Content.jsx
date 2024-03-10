import React from "react";
import classes from "./Content.module.css";
import {Route, Routes} from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Pages from "./Pages/Pages";
import Tasks from "./Tasks/Tasks";


function Content(props){
    return (
        <div className={classes.content}>
            <Routes>
                <Route path="/dashboard" element={<Dashboard state={props.state}/>}/>
                <Route path="/pages" element={<Pages state={props.state}/>}/>
                <Route path="/tasks" element={<Tasks state={props.state}/>}/>
            </Routes>
        </div>
    )
}

export default Content;