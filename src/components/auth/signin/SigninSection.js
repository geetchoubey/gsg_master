import React from "react"


const SigninSection = (props) => {
    return(
        <div className="table-cell">
            <input name="email" placeholder="Email ID" type="text" /><input name="Password" placeholder="Password" type="Password" />
            <p className="forgot-password" onClick={props.switchHandler}>Forgot password?</p>
            <div className="btn">
              Log in
            </div>
          </div>
    )
}

export default SigninSection;