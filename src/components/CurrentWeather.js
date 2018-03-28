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

  returnUnitsString = units => (units === 'F' ? 'imperial' : 'metric');

  componentWillReceiveProps({ units }) {
    units !== this.props.units && this.fetchData(units);
  }

  // place on the prototype
  // so we can spy that it's invoked
  // by componentDidMount
  fetchData(units) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=Rome&units=${this.returnUnitsString(
        units
      )}&APPID=${apiKey}`
    )
      .then(res => res.json())
      .then(res =>
        this.setState({
          name: res.name,
          temp: res.main.temp,
          iconCode: res.weather[0].icon,
          weather: res.weather[0].main,
          wind: res.wind.speed,
          clouds: res.clouds.all,
          pressure: res.main.pressure
        })
      )
      .then(() => this.props.setName(this.state.name))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.fetchData(this.props.units);
  }

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
                    src={`http://openweathermap.org/img/w/${iconCode}.png`}
                    alt="Icon depicting current weather"
                  />
                  <h3>{weather}</h3>
                </div>
                <div>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYVYTeX-IT8VF_M7yQQsClU2CQEJTXgoi8T9jaGhB66jpLWQSw"
                    alt="temperature"
                  />
                  <h3>
                    {temp.toFixed(1)} &deg;{this.props.units}
                  </h3>
                </div>
                <div>
                  <img
                    src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLHQKHJiUm02mysUrvH8vaKDY-myNAYfRHCUFJgA-LSiNeOKn-`}
                    alt="wind"
                  />
                  <h3>{wind} mph</h3>
                </div>
                <div>
                  {' '}
                  <img
                    src={`http://openweathermap.org/img/w/03d.png`}
                    alt="cloudiness"
                  />
                  <h3>{clouds}%</h3>
                </div>
                <div>
                  <img
                    src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe31uwyEa-r1R6ntqu4QPim6J6QQsIPqIrZ1RyEYebzC5esPGc`}
                    alt="barometric pressure"
                  />
                  <h3>{pressure} hpa</h3>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
