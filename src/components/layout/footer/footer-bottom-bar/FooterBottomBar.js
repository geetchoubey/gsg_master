import React from "react";
import {Link} from "react-router-dom";

const FooterBottomBar = () => {
    return(
        <div className="footer-copy">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <p className="copyright">Copyright @ Calembour Entertainment Pvt Ltd<br/>
                                <Link to="/terms_and_condition">Terms and Conditions</Link> | <Link to="/privacy_and_policy">Privacy Policy</Link>
                            </p>
                        </div>
                        <div className="col-sm-6">
                            <ul className="right list-inline social-icons">
                                <li className="list-inline-item">
                                    <a href="https://www.facebook.com/GetSetGig" rel="noopener noreferrer" target="_blank">
                                        <i className="fa fa-facebook"></i>
                                    </a>
                                </li>

                                <li className="list-inline-item">
                                    <a href="https://twitter.com/getsetgig" rel="noopener noreferrer" target="_blank">
                                        <i className="fa fa-twitter"></i>
                                    </a>
                                </li>


                                <li className="list-inline-item">
                                    <a href="https://www.instagram.com/getsetgig/" rel="noopener noreferrer" target="_blank">
                                        <i className="fa fa-instagram"></i>
                                    </a>
                                </li>

                                <li className="list-inline-item">
                                    <a href="https://www.linkedin.com/" rel="noopener noreferrer" target="_blank">
                                        <i className="fa fa-linkedin"></i>
                                    </a>
                                </li>


                            </ul>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default FooterBottomBar;