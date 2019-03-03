import React from "react"

const Steps = (props) => {
    const containerClasses = ["container"];
    if(props.showArtistsSteps === true){
        containerClasses.push("log-in")
    }
    return(
       <section className="steps-wrapper margin-bottom-100 margin-top-100">
    <div className="slide-form-layout">
        <div className={containerClasses.join(" ")}>
            <div className="box"></div>
            <div className="container-forms">
                <div className="container-info">
                    <div className="info-item">
                        <div className="table">
                            <div className="table-cell">
                                <p onClick={() => props.artistsStepsClickHandler("user")}>Looking for Artists?</p>
                                
                            </div>
                        </div>
                    </div>
                    <div className="info-item">
                        <div className="table">
                            <div className="table-cell">
                                <p onClick={() => props.artistsStepsClickHandler("artist")}>Are you an Artist?</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-form">
                    <div className="form-item log-in">
                        <div className="table">
                            <div className="table-cell">
                                <h2 className="center">Booking Artist is Now Easy</h2>
                                <div className="row margin-top-50">
                                    <div className="col-md-4 text-center">
                                        <span>
                                            <i className="fa fa-edit fa-border circle"></i>
                                        </span>

                                        <div className="feature">    
                                            <h3>Post</h3>
                                            <p>your requirement and tell us<br/>what you are looking for</p>
                                        </div>
                                    </div>
                                    <div className="col-md-4 text-center">
                                        <span>
                                            <i className="fa fa-mobile fa-moibleBorder fa-border circle"></i>
                                        </span>
                                        <div className="feature">
                                            <h3>Pick</h3>
                                            <p>an artist from the list of<br/>suitable artist</p>
                                        </div>
                                    </div>
                                    <div className="col-md-4 text-center">
                                        <span>
                                            <i className="fa fa-credit-card  fa-border circle"></i>
                                        </span>
                                        <div className="feature">
                                            <h3>Pay</h3>
                                            <p>and book the artist for<br/>your event</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-item sign-up">
                        <div className="table">
                            <div className="table-cell">
                            <h2 className="center">Booking Artist is Now Easy</h2>
                                <div className="row margin-top-50">
                                    <div className="col-md-4 text-center">
                                        <span>
                                            <i className="fa fa-edit fa-border circle"></i>
                                        </span>

                                        <div className="feature">    
                                            <h3>Post</h3>
                                            <p>your requirement and tell us<br/>what you are looking for</p>
                                        </div>
                                    </div>
                                    <div className="col-md-4 text-center">
                                        <span>
                                            <i className="fa fa-mobile fa-moibleBorder fa-border circle"></i>
                                        </span>
                                        <div className="feature">
                                            <h3>Pick</h3>
                                            <p>an artist from the list of<br/>suitable artist</p>
                                        </div>
                                    </div>
                                    <div className="col-md-4 text-center">
                                        <span>
                                            <i className="fa fa-credit-card  fa-border circle"></i>
                                        </span>
                                        <div className="feature">
                                            <h3>Pay</h3>
                                            <p>and book the artist for<br/>your event</p>
                                        </div>
                                    </div>
                                </div>
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