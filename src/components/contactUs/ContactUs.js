import React from "react";
import ContactMap from "./ContactMap/ContactMap"
import ContactForm from "./ContactForm/ContactForm";
import Helmet from "react-helmet"

class ContactUs extends React.Component{
    
    render(){
        
        return(
            <React.Fragment>
            <Helmet>
                <title>Getsetgig | Contact us</title>
            </Helmet>
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
            </React.Fragment>
        )
    }
}

export default ContactUs;