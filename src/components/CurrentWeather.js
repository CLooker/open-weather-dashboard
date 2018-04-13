import React, { Component } from 'react';
import Loading from './Loading';
import CurrentWeatherAndIcon from './CurrentWeatherAndIcon';
import CurrentTemperature from './CurrentTemperature';
import CurrentWind from './CurrentWind';
import CurrentClouds from './CurrentClouds';
import CurrentPressure from './CurrentPressure';
import handleConversion from '../utils/handleConversion.js';
import apiKey from '../api';
import PropTypes from 'prop-types';

export default class CurrentWeather extends Component {
  static propTypes = {
    setName: PropTypes.func.isRequired,
    units: PropTypes.string.isRequired
  };

  state = {
    name: null,
    temp: null,
    iconCode: null,
    weather: null,
    units: this.props.units
  };

  componentDidMount() {
    this.fetchData(this.props.units);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.compareUnits(prevState.units)) {
      this.setState({
        units: this.props.units,
        temp: handleConversion(prevState.temp, prevState.units)
      });
    }
  }

  fetchData(units) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Rome&units=${this.returnUnitsString(
        units
      )}&APPID=${apiKey}`
    )
      .then(res => res.json())
      .then(this.handleFetchReturn)
      .catch(console.error);
  }

  returnUnitsString = units => (units === 'F' ? 'imperial' : 'metric');

  handleFetchReturn = res =>
    this.setState(
      {
        name: res.name,
        temp: res.main.temp,
        iconCode: res.weather[0].icon,
        weather: res.weather[0].main,
        wind: res.wind.speed,
        clouds: res.clouds.all,
        pressure: res.main.pressure
      },
      this.updateName(res.name)
    );

  compareUnits = units => units !== this.props.units;

  updateName = name => this.props.setName(name);

  checkForName = name => (name ? true : false);

  render() {
    const {
      name,
      weather,
      temp,
      wind,
      iconCode,
      clouds,
      pressure,
      units
    } = this.state;

    return (
      <div>
        {name === null ? (
          <Loading />
        ) : (
          <div className="current-weather-container">
            <div className="current-weather">
              <h3> Weather in {name} </h3>
              <div className="weather" style={{ display: 'flex' }}>
                <CurrentWeatherAndIcon iconCode={iconCode} weather={weather} />
                <CurrentTemperature temp={temp} units={units} />
                <CurrentWind wind={wind} />
                <CurrentClouds clouds={clouds} />
                <CurrentPressure pressure={pressure} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
