import React from "react";
import ForgotPass from "./../forgotPass/ForgotPass";
import SigninSection from "./SigninSection";


const SignIn = (props) => {
  const LoadSection = props.data ? <ForgotPass switchHandler={props.switchSectionHandler}/> : <SigninSection switchHandler={props.switchSectionHandler}/>
    return(
        <React.Fragment>
        <div className="form-item log-in">
        <div className="table">
         {LoadSection}
        </div>
      </div>
        </React.Fragment>
    )
}

export default SignIn;