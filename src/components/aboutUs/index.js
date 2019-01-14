import React from "react";
import {Helmet} from "react-helmet";

class AboutUS extends React.Component{
    render(){
        return(
            <React.Fragment>
            <Helmet>
                <title>Getsetgig | About us</title>
            </Helmet>
            <div className="about-us top-header-space">
                <div className="about-us-wrapper">
                    <div className="about-us-banner">
                        <div className="about-us-banner-inner">
                            <div className="banner-title">
                            One Stop Destination For Booking Artists Online
                            </div>
                        </div>
                    </div>
                    <div className="about-us-dec1">
                        <h1>ABOUT US</h1>
                        <p>Organizing a corporate event? Or looking for a singer to liven up the wedding party?<br/>Book - Bands, Singers, DJs, Emcees, Musicians & more online with GetSetGig.</p>
                    </div>
                    <div className="about-us-events">
                        <div className="about-us-events-wrapper">
                            <span className="about-us-event">
                                <div className="about-us-event-img">
                                    <img className="img-responsive" src="https://www.wheelstreet.com/images/happyCustomers.png" alt="Happy customers"/>
                                </div>
                                <p className="title">Wedding</p>
                                <p className="dis">Live bands for wedding,receptions,gala dinners,mehndi,cocktail parties</p>
                            </span>

                            <span className="about-us-event">
                                <div className="about-us-event-img">
                                    <img className="img-responsive" src="https://www.wheelstreet.com/images/happyCustomers.png" alt="Happy customers"/>
                                </div>
                                <p className="title">College</p>
                                <p className="dis">Djs to make college fests,freshers & farewell parties more fun and happenings</p>
                            </span>

                            <span className="about-us-event">
                                <div className="about-us-event-img">
                                    <img className="img-responsive" src="https://www.wheelstreet.com/images/happyCustomers.png" alt="Happy customers"/>
                                </div>
                                <p className="title">Corporate</p>
                                <p className="dis">Hire top rated classical musicians,ghazal singers for corporate events,trade shows</p>
                            </span>

                            <span className="about-us-event">
                                <div className="about-us-event-img">
                                    <img className="img-responsive" src="https://www.wheelstreet.com/images/happyCustomers.png" alt="Happy customers"/>
                                </div>
                                <p className="title">Birthday Parties</p>
                                <p className="dis">Watch your loved ones have a merry time during birthday parties</p>
                            </span>

                            <span className="about-us-event">
                                <div className="about-us-event-img">
                                    <img className="img-responsive" src="https://www.wheelstreet.com/images/happyCustomers.png" alt="Happy customers"/>
                                </div>
                                <p className="title">Festivals</p>
                                <p className="dis">Navratra, Christmas,Id,Lohri-on all festive occasions & social gatherings</p>
                            </span>

                            <span className="about-us-event">
                                <div className="about-us-event-img">
                                    <img className="img-responsive" src="https://www.wheelstreet.com/images/happyCustomers.png" alt="Happy customers"/>
                                </div>
                                <p className="title">Hotels & Lounges</p>
                                <p className="dis">Increase footfalls through live music performances</p>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            </React.Fragment>
        )
    }
}
export default AboutUS;