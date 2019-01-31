import React, { Component } from 'react';
import AirQualityReport from '../AirQualityReport';
import CurrentWeather from '../CurrentWeather';
import FiveDayForecast from '../FiveDayForecast';
import UnitsSwitcher from '../UnitsSwitcher';
import WeatherAlerts from '../WeatherAlerts';
import './App.css';

export default class App extends Component {
  state = {
    name: 'Rome',
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
        <h1>Current Weather and Forecast in {name}</h1>
        <UnitsSwitcher setUnits={this.setUnits} units={units} />
        <CurrentWeather name={name} units={units} />
        <FiveDayForecast name={name} units={units} />
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
