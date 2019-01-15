import React from "react";
import {  Route, withRouter } from "react-router-dom";
import Homepage from "../homepage/Index";
import AboutUs from "../aboutUs/index";
import PrivacyPolicy from "../terms/PrivacyPolicy";
import TermsAndConditions from "../terms/TermsAndConditions";
import Auth from "./../auth/Index";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const Container = ({location}) => {
    return(
        <TransitionGroup className="transition-group">
        <CSSTransition
          key={location.key}
          timeout={{ enter: 300, exit: 300 }}
          classNames="fade"
        >
        <section className="route-section">
            <Route path="/" exact component={Homepage}/>
            <Route path="/about" component={AboutUs}/>
            <Route path="/privacy_and_policy" component={PrivacyPolicy}/>
            <Route path="/login" component={Auth}/>
            <Route path="/Signup" component={Auth}/>
            <Route path="/terms_and_condition" component={TermsAndConditions}/>
            </section>
        </CSSTransition>
        </TransitionGroup>
    )
    
}

export default withRouter(Container);