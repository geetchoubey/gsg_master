import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

const Testimonials = (props) => {
    var settings = {
        centerMode: false,
        slidesToShow: 1,
        infinity:false,
        responsive: [
            {
            breakpoint: 990,
            settings: {
                centerMode: false,
                slidesToShow: 1
            }
            },
            {
            breakpoint: 767,
            settings: {
                centerMode: false,
                slidesToShow: 1
            }
            }
        ]
      };


    return(
        <section className="testimonials center">
            <div className="testimonial">
        <div className="container">

            <h2 className="heading white-heading">
                Testimonial
            </h2>
            <div id="testimonial4" className="carousel slide testimonial4_indicators testimonial4_control_button thumb_scroll_x swipe_x" data-ride="carousel" data-pause="hover" data-interval="5000" data-duration="2000">
             
                <div className="carousel-inner" role="listbox">
                <Slider {...settings}>
                    <div className="carousel-item active">
                        <div className="testimonial4_slide">
                            <img src="https://i.ibb.co/L8Pj1mg/o6EuTCT6.jpg" className="img-circle img-responsive" />
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                            <h4>Client 1</h4>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="testimonial4_slide">
                            <img src="https://i.ibb.co/L8Pj1mg/o6EuTCT6.jpg" className="img-circle img-responsive" /><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                            <h4>Client 2</h4>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="testimonial4_slide">
                            <img src="https://i.ibb.co/L8Pj1mg/o6EuTCT6.jpg" className="img-circle img-responsive" />
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                            <h4>Client 3</h4>
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

export default Testimonials;