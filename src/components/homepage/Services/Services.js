import React from "react";

const Services = () => {
    return(
        <section className="services">
            <div className="container">
                <div className="row">
                    <div className="col-md-10 col-md-offset-1">
                        <div className="services-wrapper">
                            <div className="row">
                                <div className="col-md-2 center">
                                    <a href="">
                                    <img src={"/images/1.png"} className="icon" alt=""/>
                                    <p>Singer</p>
                                    </a>
                                    
                                </div>
                                <div className="col-md-2 center">
                                <a href="">
                                    <img src={"/images/2.png"} className="icon" alt=""/>
                                    <p>Artist DJ</p>
                                    </a>
                                </div>
                                <div className="col-md-2 center">
                                <a href="">
                                    <img src={"/images/3.png"} className="icon" alt=""/>
                                    <p>Comic Artist</p>
                                    </a>
                                </div>
                                <div className="col-md-2 center">
                                <a href="">
                                    <img src={"/images/4.png"} className="icon" alt=""/>
                                    <p>Music Band</p>
                                    </a>
                                </div>
                                <div className="col-md-2 center">
                                <a href="">
                                    <img src={"/images/5.png"} className="icon" alt=""/>
                                    <p>Emcee(anchor)</p>
                                    </a>
                                </div>
                                <div className="col-md-2 center">
                                <a href="">
                                    <img src={"/images/6.png"} className="icon" alt=""/>
                                    <p>Instrumentalist</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Services ;