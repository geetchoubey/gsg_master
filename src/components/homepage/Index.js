import React from "react"
import {Helmet} from "react-helmet";
import Banner from "./Banner/Banner";
import Services from "./Services/Services";
import HomepageArtists from "./HomepageArtists/HomepageArtists";
import Steps from "./Steps/Steps";
import Testimonials from "./Testimonials/Testimonials"

class Homepage extends React.Component{
    state = {
        eventDate: new Date(),
        homepageArtists : [
            {
                name: "Azharuddin",
                cat: "Singer",
                img: "/images/singer.jpg",
                vid: "https://www.youtube.com/embed/jFGKJBPFdUA"
            },
            {
                name: "Azharuddin",
                cat: "Singer",
                img: "/images/singer.jpg",
                vid: "https://www.youtube.com/embed/jFGKJBPFdUA"
            }
        ],
        showArtistsSteps:false
    }
    
    handleChange = (date) => {

        this.setState({
            eventDate: date
        })
        
      }

      artistsStepsClickHandler = (l, e) => {
        console.log(l)
        if(l==="artist"){
          this.setState({
            showArtistsSteps:true
          })
        }
        else{
          this.setState({
            showArtistsSteps:false
          })
        }
      }
    render(){
        return(
            <React.Fragment>
        <Helmet>
            <title>Getsetgig</title>
        </Helmet>
        <div className="home-page">
            <Banner eventDate={this.state.eventDate} dateChangeHandler = {this.handleChange}/>

            <Services/>
            <Steps artistsStepsClickHandler = {this.artistsStepsClickHandler} showArtistsSteps = {this.state.showArtistsSteps}/>
            <HomepageArtists artists = {this.state.homepageArtists}/>
            <Testimonials/>
        </div>
        </React.Fragment>
        )
    }
}

export default Homepage;