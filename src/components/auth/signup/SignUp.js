import React from "react"


const SignUp = (props) => {
    return(
        <React.Fragment>
        <div className="form-item sign-up">
        <div className="table">
          <div className="table-cell">
            <input name="email" placeholder="Email" type="text" /><input name="fullName" placeholder="Full Name" type="text" /><input name="Username" placeholder="Username" type="text" /><input name="Password" placeholder="Password" type="Password" />
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