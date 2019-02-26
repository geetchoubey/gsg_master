import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { library }  from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

const HomepageArtists = (props) => {
    console.log(props)
    var settings = {
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 3,
        infinity:false,
        responsive: [
            {
            breakpoint: 990,
            settings: {
                centerMode: false,
                centerPadding: '40px',
                slidesToShow: 2
            }
            },
            {
            breakpoint: 767,
            settings: {
                centerMode: false,
                centerPadding: '40px',
                slidesToShow: 1
            }
            }
        ]
      };
    library.add(faPlay)
    return(
        <section className="homepage-artists">
            <div className="homepage-artists-wrapper">
                <div className="container">
                    <h2 className="center"><strong>2000+</strong> verified Artist</h2>
                    <div className="homepage-artists-slider-wrapper">
                        <div className="homepage-artists-slider">
                            <Slider {...settings}>
                            <div className="homepage-artists-slide-wrapper">

                                <a className="homepage-artists-slide center">
                                    <div className="homepage-artists-slide-content-wrapper">
                                        <h2 className="bold">Name</h2>
                                        <p>Singer</p>
                                        <span className="player">
                                            <FontAwesomeIcon icon="play" />
                                        </span>
                                    </div>
                                    <div className="hero-column__cta text-uppercase">
                                        Know more
                                    </div>
                                </a>
                            </div>

                            <div className="homepage-artists-slide-wrapper">
                                <div className="homepage-artists-slide center">
                                    <div className="homepage-artists-slide-content-wrapper">
                                        <h2 className="bold">Name</h2>
                                        <p>Singer</p>
                                        <span className="player">
                                            <FontAwesomeIcon icon="play" />
                                        </span>
                                    </div>
                                    <div className="hero-column__cta text-uppercase">
                                        Know more
                                    </div>
                                </div>
                            </div>

                            <div className="homepage-artists-slide-wrapper">
                                <div className="homepage-artists-slide center">
                                    <div className="homepage-artists-slide-content-wrapper">
                                        <h2 className="bold">Name</h2>
                                        <p>Singer</p>
                                        <span className="player">
                                            <FontAwesomeIcon icon="play" />
                                        </span>
                                    </div>
                                    <div className="hero-column__cta text-uppercase">
                                        Know more
                                    </div>
                                </div>
                            </div>
                            <div className="homepage-artists-slide-wrapper">
                                <div className="homepage-artists-slide center">
                                    <div className="homepage-artists-slide-content-wrapper">
                                        <h2 className="bold">Name</h2>
                                        <p>Singer</p>
                                        <span className="player">
                                            <FontAwesomeIcon icon="play" />
                                        </span>
                                    </div>
                                    <div className="hero-column__cta text-uppercase">
                                        Know more
                                    </div>
                                </div>
                            </div>
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomepageArtists;