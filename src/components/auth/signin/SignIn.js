import React from "react"


const SignIn = (props) => {
    return(
        <React.Fragment>
        <div className="form-item log-in">
        <div className="table">
          <div className="table-cell">
            <input name="Username" placeholder="Username" type="text" /><input name="Password" placeholder="Password" type="Password" />
            <div className="btn">
              Log in
            </div>
          </div>
        </div>
      </div>
        </React.Fragment>
    )
}

export default SignIn;