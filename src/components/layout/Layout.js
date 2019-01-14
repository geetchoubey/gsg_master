import React from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Homepage from "../homepage/Index";
import {BrowserRouter, Route} from "react-router-dom";
import AboutUs from "../aboutUs/index";
import PrivacyPolicy from "../terms/PrivacyPolicy";
import TermsAndConditions from "../terms/TermsAndConditions";
import ScrollToTop from 'react-router-scroll-top';
import Auth from "./../auth/Index";

const Layout = (props) => {
    return(
        <React.Fragment>
            
            <BrowserRouter>
            <React.Fragment>
                
                <Header/>
                
                <Route path="/" exact component={Homepage}/>
                <Route path="/about" component={AboutUs}/>
                <Route path="/privacy_and_policy" component={PrivacyPolicy}/>
                <Route path="/login" component={Auth}/>
                <Route path="/terms_and_condition" component={TermsAndConditions}/>
                <Footer/>
                <ScrollToTop/>
            </React.Fragment>
            </BrowserRouter>
            
            
        </React.Fragment>
    )
}

export default Layout;