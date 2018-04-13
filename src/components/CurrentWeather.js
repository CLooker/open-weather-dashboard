import React, { Component } from 'react';
import Loading from './Loading';
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
    weather: null
  };

  componentDidMount() {
    this.fetchData(this.props.units);
  }

  componentWillReceiveProps({ units }) {
    units !== this.props.units && this.fetchData(units);
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

  updateName = name => this.props.setName(name);

  returnUnitsString = units => (units === 'F' ? 'imperial' : 'metric');

  render() {
    const {
      name,
      weather,
      temp,
      wind,
      iconCode,
      clouds,
      pressure
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
                <div className="weather-and-icon">
                  <img
                    src={`https://openweathermap.org/img/w/${iconCode}.png`}
                    alt="Icon depicting current weather"
                  />
                  <h4>{weather}</h4>
                </div>
                <div>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYVYTeX-IT8VF_M7yQQsClU2CQEJTXgoi8T9jaGhB66jpLWQSw"
                    alt="temperature"
                  />
                  <h4>
                    {temp.toFixed(1)} &deg;{this.props.units}
                  </h4>
                </div>
                <div>
                  <img
                    src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLHQKHJiUm02mysUrvH8vaKDY-myNAYfRHCUFJgA-LSiNeOKn-`}
                    alt="wind"
                  />
                  <h4>{wind} mph</h4>
                </div>
                <div>
                  <img
                    src={`https://openweathermap.org/img/w/03d.png`}
                    alt="cloudiness"
                  />
                  <h4>{clouds}%</h4>
                </div>
                <div>
                  <img
                    src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe31uwyEa-r1R6ntqu4QPim6J6QQsIPqIrZ1RyEYebzC5esPGc`}
                    alt="barometric pressure"
                  />
                  <h4>{pressure} hpa</h4>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
