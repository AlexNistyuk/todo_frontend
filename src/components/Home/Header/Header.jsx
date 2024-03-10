import React from "react";
import "./Header.css";
import Logo from "./Logo/Logo";
import Username from "./Username/Username";

function Header(){
    return (
        <div className="header">
            <Logo/>
            <Username/>
        </div>
    )
}

export default Header;