import React, { Component } from 'react';
import './App.css';
import Layout from "./components/layout/Layout"


class App extends Component {
  state = {
    headerColor: "white"
  }
  changeHeaderColorHandler = (color) => {
    this.setState({
      headerColor:color
    })
  }
  render() {
    return (
      <div className="App">
        <Layout headerColor={this.state.headerColor} headerColorHandler={this.changeHeaderColorHandler}/>
      </div>
    );
  }
}

export default App;
