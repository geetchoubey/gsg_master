import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import SignIn from "./signin/SignIn";
import SignUp from "./signup/SignUp";

class Auth extends Component {

  state = {
    showSignIn:true,
    showForgotPass:false
  }

  loginSignupClickHandler = (l, e) => {
    if(l==="login"){
      this.setState({
        showSignIn:true
      })
    }
    else{
      this.setState({
        showSignIn:false
      })
    }

    
    
    
  }

  showForgotPassHandler = (el) => {
    this.setState({
      showForgotPass:!this.state.showForgotPass
    })
  }
  componentDidMount = () => {
    this.loginSignupClickHandler((this.props.location.pathname).replace("/",""))
    
  }

  render() {
    const containerClasses = ["container"];
    if(this.state.showSignIn === false){
      containerClasses.push("log-in")
    }

    


    return (
      <React.Fragment>
        <Helmet>
            <title>Getsetgig | {(this.props.location.pathname).replace("/","") === "login" ? "Login" : "Signup"}</title>
        </Helmet>
      <div className="Auth top-header-space">
        <div className="login-menu">
          <button onClick={(e)=>this.loginSignupClickHandler("login", e)} className={this.state.showSignIn ? "active" : ""}>Log in</button>
          <button onClick={(e)=>this.loginSignupClickHandler("signup", e)} className={!this.state.showSignIn ? "active" : ""}>Sign up</button>
        </div>
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
                    <div className="btn" onClick={() => this.loginSignupClickHandler("login")}>
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
                    <div className="btn" onClick={() => this.loginSignupClickHandler("signup")}>
                      Sign up
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-form">
              <SignIn data={this.state.showForgotPass} switchSectionHandler={this.showForgotPassHandler}/>
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
