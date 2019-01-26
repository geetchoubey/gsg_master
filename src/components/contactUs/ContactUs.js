import React from "react";
import ContactMap from "./ContactMap/ContactMap"
import ContactForm from "./ContactForm/ContactForm"

class ContactUs extends React.Component{
    
    render(){
        
        return(
            <div className="contact-wrapper top-header-space">
                <div className="row">
                    <div className="col-md-6">
                        <ContactForm/>
                    </div>
                    <div className="col-md-6">
                        <ContactMap/>
                    </div>
                </div>
            </div>
        )
    }
}

export default ContactUs;