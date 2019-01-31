import React, { Component } from 'react';
import AirQualityReport from '../AirQualityReport';
import CurrentWeather from '../CurrentWeather';
import FiveDayForecast from '../FiveDayForecast';
import UnitsSwitcher from '../UnitsSwitcher';
import WeatherAlerts from '../WeatherAlerts';
import './App.css';

export default class App extends Component {
  state = {
    units: 'F'
  };

  setUnits = units => this.setState({ units });

  render() {
    const { name, units } = this.state;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <h1>Current Weather and Forecast in Rome</h1>
        <UnitsSwitcher setUnits={this.setUnits} units={units} />
        <CurrentWeather units={units} />
        <FiveDayForecast units={units} />
        <div
          style={{
            display: 'flex'
          }}
        >
          <WeatherAlerts />
          <AirQualityReport />
        </div>
      </div>
    );
  }
}
