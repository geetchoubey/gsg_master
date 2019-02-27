import React from "react"

const Steps = () => {
    return(
       <section className="steps-wrapper">
    <div className="slide-form-layout">
        <div className="container">
            <div className="box"></div>
            <div className="container-forms">
                <div className="container-info">
                    <div className="info-item">
                        <div className="table">
                            <div className="table-cell">
                                <p>Booking Artist is Now Easy</p>
                                
                            </div>
                        </div>
                    </div>
                    <div className="info-item">
                        <div className="table">
                            <div className="table-cell">
                                <p>Don't have an account?</p>
                                <div className="btn">Sign up</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-form">
                    <div className="form-item log-in">
                        <div className="table">
                            <div className="table-cell">
                                <input name="email" placeholder="Email ID" type="text"/>
                                <input name="Password" placeholder="Password" type="Password"/>
                                <p className="forgot-password">Forgot password?</p>
                                <div className="btn">Log in</div>
                            </div>
                        </div>
                    </div>
                    <div className="form-item sign-up">
                        <div className="table">
                            <div className="table-cell">
                                <input name="email" placeholder="Email" type="text"/>
                                <input name="password" placeholder="Password" type="password"/>
                                <input name="confPassword" placeholder="Confirm Password" type="password"/>
                                <input name="contact" placeholder="Contact No." type="text"/>
                                <div className="btn">Sign up</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
    )
}

export default Steps;