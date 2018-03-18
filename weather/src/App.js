import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "",
      zip: 10025,
      pageLoaded: false,
      currentTemp: "",
      city: ""
    };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  //AXIOS call to the open weathermap api
  getWeatherData() {
    axios({
      url: `https://api.openweathermap.org/data/2.5/weather?zip=${
        this.state.zip
      },us&APPID=9aab895df45e887152264ac1c983b213&units=imperial`,
      method: "GET"
    }).then(res => {
      console.log(res.data);
      this.setState({
        data: res.data,
        pageLoaded: true,
        currentTemp: res.data.main.temp,
        city: res.data.name
      });
    });
  }

  componentDidMount() {
    this.getWeatherData();
  }
  handleChange(ev) {
    this.setState({ zip: ev.target.value });
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.setState(() => {
      return {
        zip: ev.zip
      };
    }, this.getWeatherData());
  }

  render() {
    return (
      <div className="background">
        <div className="info">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div>
              <h1>The temperatute is now {this.state.currentTemp} &deg;F </h1>
              <h3>In {this.state.city}</h3>
            </div>
            <input
              placeholder="enter zip code"
              name="zip"
              onChange={this.handleChange.bind(this)}
            />
            <input type="submit" value="search" />
          </form>
          <div className="image" />
        </div>
      </div>
    );
  }
}

export default App;
