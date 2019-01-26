import React from "react"
import {Link, NavLink} from "react-router-dom";


const Header = (props) => {
    return(
        
        <header className={props.headerColor}>
            <div className="logo-wrapper">
                <Link to="/">
                    <img src={"/images/logo.png"} className="white" alt=""/>
                </Link>
            </div>
            <div className="menu-wrapper">
                
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/signup">Sign up</NavLink>
                <NavLink to="/about">About us</NavLink>
                <NavLink to="/contact">Contact us</NavLink>
                <a href="tel:+918108264474">Call: +91-8108264474</a>
            </div>

            

        </header>
    )
}

export default Header;