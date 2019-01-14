import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import SignIn from "./signin/SignIn";
import SignUp from "./signup/SignUp";

class Auth extends Component {

  state = {
    showSignIn:true
  }

  loginSignupClickHandler = () => {
    this.setState({
      showSignIn:!this.state.showSignIn
    })
  }
  render() {
    const containerClasses = ["container"];
    if(this.state.showSignIn === false){
      containerClasses.push("log-in")
    }
    return (
      <React.Fragment>
        <Helmet>
            <title>Getsetgig | Login</title>
        </Helmet>
      <div className="Auth top-header-space">
        <div className={containerClasses.join(" ")}>
          <div className="box"></div>
          <div className="container-forms">
            <div className="container-info">
              <div className="info-item">
                <div className="table">
                  <div className="table-cell">
                    <p>
                      Have an account?
                    </p>
                    <div className="btn" onClick={this.loginSignupClickHandler}>
                      Log in
                    </div>
                  </div>
                </div>
              </div>
              <div className="info-item">
                <div className="table">
                  <div className="table-cell">
                    <p>
                      Don't have an account? 
                    </p>
                    <div className="btn" onClick={this.loginSignupClickHandler}>
                      Sign up
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-form">
              <SignIn/>
              <SignUp/>
            </div>
          </div>
        </div>
      </div>
      </React.Fragment>
    );
  }
}

export default Auth;
