import React from "react";
import BannerForm from "./BannerForm";

const Banner = (props) => {
    return(
        <section className="homepage-banner">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="home-wrapper">
                                <div className="home-banner-text-wrapper">
                                <h1 className="text-transparent">Add Live To Your<br/>Event</h1>
                                </div>
                                <h4>Find and Book Artists For Your Event Now.</h4>
                                <a href="/" className="btn btn-white">Learn more</a>
                            </div>
                        </div>

                        <div className="col-sm-4 offset-sm-2">
                            <div className="home-wrapper">
                                <BannerForm  eventDate={props.eventDate} changeHandler = {props.dateChangeHandler}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    )
}

export default Banner;