import React from "react";

class Subscribe extends React.Component{
    render(){
        return(
            <div className="subscribe">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                        <p className="subscribe-text">Get updates of gigs around you:</p>
                        </div>
                        <div className="col-md-5">
                        
                        <span className="input input--madoka">
                            <input className="input__field input__field--madoka" type="text" id="input-31" placeholder=" "/>
                            <label className="input__label input__label--madoka" htmlFor="input-31">
                                <svg className="graphic graphic--madoka" width="100%" height="100%" viewBox="0 0 404 77" preserveAspectRatio="none">
                                    <path d="m0,0l404,0l0,77l-404,0l0,-77z"></path>
                                </svg>
                                <span className="input__label-content input__label-content--madoka">Email</span>
                            </label>
                        </span>
                        </div>
                        <div className="col-md-3">
                            <button className="button subscribe-button">Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Subscribe;