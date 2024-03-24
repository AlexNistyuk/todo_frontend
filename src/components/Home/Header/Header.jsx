import React from "react";
import "./Header.css";
import Logo from "./Logo/Logo";
import DropdownMenu from "./DropdownMenu/DropdownMenu";


function Header(){
    return (
        <div className="header">
            <Logo/>
            <DropdownMenu/>
        </div>
    )
}

export default Header;