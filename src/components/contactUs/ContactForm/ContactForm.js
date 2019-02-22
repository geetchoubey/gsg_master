import React from "react";

const ContactForm = (props) => {
    return(
        <div className="form-wrapper">
            <div className="form-container">
            <h1>CONTACT US</h1>
            <p className="center">We are always here to help out whatever way we can.</p>
            <div className="form">
                <input name="name" placeholder="Name" type="text"/>
                <input name="email" placeholder="Email ID" type="text"/>
                <input name="phone" placeholder="Contact" type="text"/>
                <textarea name="message" cols="30" rows="4" placeholder="Type your message"></textarea>
                <button className="submit">Submit</button>
            </div>
            </div>
            
        </div>
    )
}

export default ContactForm;