import React, { Component } from 'react';
import Loading from './Loading';
import handleConversion from '../utils/handleConversion.js';
import apiKey from '../api';
import moment from 'moment';
import PropTypes from 'prop-types';

export default class FiveDayForecast extends Component {
  static propTypes = {
    name: PropTypes.string,
    units: PropTypes.string.isRequired
  };

  state = {
    forecast: []
  };

  componentDidMount() {
    this.fetchData(this.props.units);
  }

  componentDidUpdate(prevProps, prevState) {
    this.compareUnits(prevProps.units) &&
      this.updateForecastTemps(prevProps.units);
  }

  compareUnits = units => units !== this.props.units;

  updateForecastTemps = prevUnits =>
    this.setState(({ forecast }) => ({
      forecast: forecast.map(f => ({
        ...f,
        highs: handleConversion(f.highs, prevUnits),
        lows: handleConversion(f.lows, prevUnits)
      }))
    }));

  removeToday = ({ list }) => {
    const today = moment().format('dddd MMM Do YY');
    return list.filter(
      f => moment(f.dt_txt).format('dddd MMM Do YY') !== today
    );
  };

  returnUnitsString = units => (units === 'F' ? 'imperial' : 'metric');

  prepareDaysCollForData = daysColl =>
    daysColl.map(d => ({
      day: d,
      highs: [],
      lows: [],
      weather: [],
      wind: [],
      clouds: [],
      pressure: [],
      icon: null
    }));

  returnSummarizedData = daysColl =>
    daysColl.map(d => ({
      ...d,
      highs: d.highs.reduce(
        (highest, n) => (n > highest ? n : highest),
        d.highs[0]
      ),
      lows: d.lows.reduce((lowest, n) => (n < lowest ? n : lowest), d.lows[0]),
      wind: (d.wind.reduce((total, n) => total + n) / d.wind.length).toFixed(1),
      clouds: d.clouds.reduce((total, n) => total + n) / d.clouds.length,
      pressure: d.pressure.reduce((total, n) => total + n) / d.pressure.length
    }));

  fetchData(units) {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?id=6539761&units=${this.returnUnitsString(
        units
      )}&APPID=${apiKey}`
    )
      .then(res => res.json())
      .then(res => {
        // filter out weather info from today
        const notToday = [...this.removeToday(res)];

        // collection of days for our 5 day forecast
        let days = [];
        notToday.forEach(f => {
          // add day key and value of formatted date to weather info
          f.day = moment(f.dt_txt).format('dddd MMM Do YY');

          // if our days collection doesn't include that date
          // add it to our collection
          days.includes(f.day) || (days = [...days, f.day]);
        });

        // add props to each day in our day coll
        days = this.prepareDaysCollForData(days);

        // accumulate values in our days coll
        // with the right days from our weather info
        notToday.forEach(f => {
          const localday = f.day;
          days.forEach(d => {
            if (d.day === localday) {
              d.highs = [...d.highs, f.main.temp_max];
              d.lows = [...d.lows, f.main.temp_min];
              d.weather = [...d.weather, f.weather[0].description];
              d.wind = [...d.wind, f.wind.speed];
              d.clouds = [...d.clouds, f.clouds.all];
              d.pressure = [...d.pressure, f.main.pressure];
            }
          });
        });

        // get averages/max high/max low
        days = this.returnSummarizedData(days);

        // get the most common weather description throughout the day
        // also choose weather icon based on that
        days.forEach(d => {
          let x = {};
          d.weather.forEach(w => {
            if (x[w]) {
              x[w]++;
            } else {
              x[w] = 1;
            }
          });
          if (Object.keys(x).length <= 1) {
            d.weather = Object.keys(x)[0];
            d.icon = notToday.reduce((icon, day) => {
              if (day.weather[0].description === d.weather) {
                return day.weather[0].icon;
              }
              return icon;
            }, null);
          } else {
            let max = Object.keys(x)
              .map(key => x[key])
              .sort((a, b) => b - a)[0];
            d.weather = Object.keys(x).find(key => x[key] === max);
            d.icon = notToday.reduce((icon, day) => {
              if (day.weather[0].description === d.weather) {
                return day.weather[0].icon;
              }
              return icon;
            }, null);
          }
        });

        // set our state
        this.setState({
          forecast: days
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        {this.state.forecast.length < 1 ? (
          <Loading />
        ) : (
          <div className="five-day-forecast">
            <h3 className="five-day-forecast-title">
              Forecast in {this.props.name}{' '}
            </h3>
            <ul className="forecast">
              {this.state.forecast.map(f => {
                const {
                  day,
                  icon,
                  weather,
                  highs,
                  lows,
                  wind,
                  clouds,
                  pressure
                } = f;
                return (
                  <li key={day}>
                    <div className="forecast-list">
                      <p>
                        <strong>{day}</strong>
                      </p>
                      <div className="forecast-weather-container">
                        <img
                          src={`https://openweathermap.org/img/w/${icon}.png`}
                          alt="weather"
                        />
                        <p>{weather}</p>
                      </div>
                      <br />
                      <div>
                        <img
                          src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYVYTeX-IT8VF_M7yQQsClU2CQEJTXgoi8T9jaGhB66jpLWQSw`}
                          alt="high temperature"
                        />
                        <p>
                          {highs.toFixed(1)} &deg;{this.props.units}
                        </p>
                      </div>
                      <br />
                      <div>
                        <img
                          src={`https://lh3.googleusercontent.com/umbUE_DTWWiYad0I1ZB38WcSBFSLzSYYgKSJwTdHnjHHpuTMfvMoGHEiv4iPolyY-A=w300`}
                          alt="low temperature"
                        />
                        <p>
                          {lows.toFixed(1)} &deg;{this.props.units}
                        </p>
                      </div>
                      <br />
                      <div>
                        <img
                          src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLHQKHJiUm02mysUrvH8vaKDY-myNAYfRHCUFJgA-LSiNeOKn-`}
                          alt="wind"
                        />
                        <p>{wind} m/ph</p>
                      </div>
                      <br />
                      <div>
                        <img
                          src={`https://openweathermap.org/img/w/03d.png`}
                          alt="cloudiness"
                        />
                        <p>{clouds.toFixed()}%</p>
                      </div>
                      <br />
                      <div>
                        <img
                          src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe31uwyEa-r1R6ntqu4QPim6J6QQsIPqIrZ1RyEYebzC5esPGc`}
                          alt="barometric pressure"
                        />
                        <p>{Number(pressure).toFixed()} hpa</p>
                      </div>
                    </div>
                    <br />
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
}
