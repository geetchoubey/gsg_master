import React from "react"
import {Link, NavLink} from "react-router-dom";
// import HeaderForm from "./HeaderForm/HeaderForm"


class Header extends React.Component{

    state = {
        MenuOpen:false,
        headerColor: this.props.headerColor
    }

    hambergerClickHandler = (e) => {
        this.setState({
            MenuOpen: !this.state.MenuOpen
        })
        document.querySelector(".hamberger-check").checked = !this.state.MenuOpen
    }
    
    menuClickHandler = () => {
        this.setState({
            MenuOpen: false
        })
        document.querySelector(".hamberger-check").checked = false
    }

    render(){
        var menuwrapperclass = this.state.MenuOpen ? "black open" : this.props.headerColor 
        return(
            <header className={menuwrapperclass}>
                <div className="logo-wrapper">
                    <Link onClick={this.menuClickHandler} to="/">
                        <img src={"/images/logo.png"} className="white" alt=""/>
                    </Link>
                </div>
                {/* <HeaderForm/> */}
                <div className="hamberger-menu right">
                <a href="null">
                    <input type="checkbox" onClick={this.hambergerClickHandler} className="hamberger-check"/>
                    <span></span>
                    <span></span>
                    <span></span>
                </a>
                </div>
                <div className="menu-wrapper">
                    
                    <NavLink onClick={this.menuClickHandler} to="/login">Login</NavLink>
                    <NavLink onClick={this.menuClickHandler} to="/signup">Sign up</NavLink>
                    <NavLink onClick={this.menuClickHandler} to="/about">About us</NavLink>
                    <NavLink onClick={this.menuClickHandler} to="/contact">Contact us</NavLink>
                    {/* <a href="tel:+918108264474">Call: +91-8108264474</a> */}
                </div>
            </header>
        )
    }
}

export default Header;