import React from "react"
import {Helmet} from "react-helmet";
import Banner from "./Banner/Banner";

class Homepage extends React.Component{
    state = {
        eventDate: new Date()
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
        </div>
        </React.Fragment>
        )
    }
}

export default Homepage;