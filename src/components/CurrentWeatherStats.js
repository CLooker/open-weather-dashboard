import React, { Component } from 'react';
import CurrentWeatherStatsWeather from './CurrentWeatherStatsWeather';

export default class CurrentWeatherStats extends Component {
  render() {
    const {
      iconCode,
      weather,
      temp,
      units,
      wind,
      clouds,
      pressure
    } = this.props;
    return (
      <div className="weather" style={{ display: 'flex' }}>
        <CurrentWeatherStatsWeather iconCode={iconCode} weather={weather} />
        <div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYVYTeX-IT8VF_M7yQQsClU2CQEJTXgoi8T9jaGhB66jpLWQSw"
            alt="temperature"
          />
          <h4>
            {temp.toFixed(1)} &deg;{units}
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
    );
  }
}
