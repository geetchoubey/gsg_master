import React from "react"
import {Link, NavLink} from "react-router-dom";


const Header = (props) => {
    return(
        
        <header className="white">
            <div className="logo-wrapper">
                <Link to="/">
                    <img src={"/images/logo.png"} className="white" alt=""/>
                </Link>
            </div>
            <div className="menu-wrapper">
                <NavLink to="/about">About us</NavLink>
                <NavLink to="/login">Login</NavLink>
            </div>
        </header>
    )
}

export default Header;