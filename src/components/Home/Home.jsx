import React from "react";
import Header from "./Header/Header";
import Manager from "./Manager/Manager";
import {Navigate} from "react-router-dom";


function Home(props){
    if (!props.isAuthorized){
        return <Navigate to="/login"/>
    }

    return (
        <div className="home">
            <Header state={props.state}/>
            <Manager state={props.state}/>
        </div>
    )
}

export default Home;


