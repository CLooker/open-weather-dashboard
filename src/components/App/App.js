import React, { Component } from 'react';
import AirQualityReport from '../AirQualityReport';
import CurrentWeather from '../CurrentWeather';
import FiveDayForecast from '../FiveDayForecast';
import { Title } from '../common';
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
      <div className='app-container'>
        <Title
          HeaderTag='h1'
          text={`Current Weather and Forecast in ${name}`}
        />
        <UnitsSwitcher setUnits={this.setUnits} units={units} />
        <CurrentWeather name={name} units={units} />
        <FiveDayForecast name={name} units={units} />
        <div className='alert-and-quality-container'>
          <WeatherAlerts />
          <AirQualityReport />
        </div>
      </div>
    );
  }
}
