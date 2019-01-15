import React from "react"


const SignUp = (props) => {
    return(
        <React.Fragment>
        <div className="form-item sign-up">
        <div className="table">
          <div className="table-cell">
            <input name="email" placeholder="Email" type="text" /><input name="password" placeholder="Password" type="password" /><input name="confPassword" placeholder="Confirm Password" type="password" /><input name="contact" placeholder="Contact No." type="text" />
            <div className="btn">
              Sign up
            </div>
          </div>
        </div>
      </div>
        </React.Fragment>
    )
}

export default SignUp;