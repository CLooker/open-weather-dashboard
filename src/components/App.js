import React, { Component } from 'react';
import WeatherAndForecastLocation from './WeatherAndForecastLocation';
import UnitsSwitcher from './UnitsSwitcher';
import CurrentWeather from './CurrentWeather';
import FiveDayForecast from './FiveDayForecast';
import AirQualityReport from './AirQualityReport';
import WeatherAlertContainer from './WeatherAlertContainer';
import '.././App.css';

export default class App extends Component {
  state = {
    name: null,
    units: 'F'
  };

  setName = name => this.setState({ name });

  setUnits = units => this.setState({ units });

  render() {
    return (
      <div className="component-container">
        <WeatherAndForecastLocation name={this.state.name} />
        <UnitsSwitcher
          name={this.state.name}
          setUnits={this.setUnits}
          units={this.state.units}
        />
        <CurrentWeather setName={this.setName} units={this.state.units} />
        <FiveDayForecast name={this.state.name} units={this.state.units} />
        <div className="alert-and-quality-container">
          <WeatherAlertContainer />
          <AirQualityReport />
        </div>
      </div>
    );
  }
}
