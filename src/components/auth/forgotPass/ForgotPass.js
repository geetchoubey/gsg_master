import React from "react"


const ForgotPass = (props) => {
    return(
        <div className="table-cell">
            <input name="email" placeholder="Email ID" type="text" />
            <p className="forgot-password" onClick={props.switchHandler}>Login?</p>
            <div className="btn">
              Submit
            </div>
          </div>
    )
}

export default ForgotPass;