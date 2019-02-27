import React from "react"
import {Helmet} from "react-helmet";
import Banner from "./Banner/Banner";
import Services from "./Services/Services";
import HomepageArtists from "./HomepageArtists/HomepageArtists";
import Steps from "./Steps/Steps";

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
        ]
    }
    
    handleChange = (date) => {

        this.setState({
            eventDate: date
        })
        
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
            <Steps/>
            <HomepageArtists artists = {this.state.homepageArtists}/>
        </div>
        </React.Fragment>
        )
    }
}

export default Homepage;