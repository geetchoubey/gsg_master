import React from "react";

const Contact = (props) => {
    
    return(
        <React.Fragment>
            <h5>Contact us</h5>
            <ul className="nostyle-list">
                <li><strong>Address</strong>: C-1214, Kailas Business Park, Link Rd, Hiranandani Gardens, Vikhroli (W), Mumbai, Maharashtra 4000794</li>
                <li><strong>Phone</strong>: +91-8108264474</li>
                <li><strong>Email</strong>: <a href="mailto:test@test.com">test@test.com</a>  </li>
            </ul>
        </React.Fragment>
        
    )
}

export default Contact;