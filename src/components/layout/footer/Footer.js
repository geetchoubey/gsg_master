import React from "react";
import MenuList from "./menuList/MenuList";
import Contact from "./contact/Contact"
import FooterBottomBar from  "./footer-bottom-bar/FooterBottomBar";
import Subscribe from "./subscribe/Subscribe"

class Footer extends React.Component {
    // State for this component to store all data, read about react state: https://reactjs.org/docs/state-and-lifecycle.html
    state = {
        footerMenus1 : 
            {
                heading:"I Want To Book",
                menus:[
                    {
                        name:"Singers",
                        link:"http://getsetgig.com/discoverArtist/Singer"
                    },
                    {
                        name:"Musicians",
                        link:"http://getsetgig.com/discoverArtist/Instrumentalist"
                    },
                    {
                        name:"DJ",
                        link:"http://getsetgig.com/discoverArtist/DJ"
                    },
                    {
                        name:"Band",
                        link:"http://getsetgig.com/discoverArtist/Band"
                    },
                    {
                        name:"Emcee",
                        link:"http://getsetgig.com/discoverArtist/Emcee (Anchor)"
                    },
                    {
                        name:"Stand-up Comedian",
                        link:"http://getsetgig.com/discoverArtist/Stand-Up"
                    }
                ]
            },

            footerMenus2:{
                heading:"I Am Looking Artist For",
                menus:[
                    {
                        name:"Corporate Party",
                        link:"http://getsetgig.com/discoverArtist/Singer"
                    },
                    {
                        name:"Private Party",
                        link:"http://getsetgig.com/discoverArtist/Instrumentalist"
                    },
                    {
                        name:"Wedding Party",
                        link:"http://getsetgig.com/discoverArtist/DJ"
                    },
                    {
                        name:"Festivals",
                        link:"http://getsetgig.com/discoverArtist/Band"
                    },
                    {
                        name:"Others",
                        link:"http://getsetgig.com/discoverArtist/Emcee (Anchor)"
                    }
                ]
            }
        
    }

    render() {
        return(
            <React.Fragment>
            <Subscribe/>
            <footer className="bg-dark">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <img src={"/images/logo.png"} className="logo-white" alt=""/>
                        <p className="about">GetSetGig is an online artist booking agency.You can book live performing artist like singers, musicians, emcees, comedians and DJ for your events within hours, hassle free.</p>
                    </div>
                    <div className="col-md-2">
                        <MenuList data={this.state.footerMenus1}/>
                    </div>
                    <div className="col-md-2">
                        <MenuList data={this.state.footerMenus2}/>
                    </div>
                    <div className="col-md-4">
                        <Contact/>
                    </div>
                </div>
            </div>
            <FooterBottomBar/>
        </footer>
        </React.Fragment>
        )
    }
}

export default Footer;