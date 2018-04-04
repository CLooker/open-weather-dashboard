import React, { Component } from 'react';
import Loading from './Loading';
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

  returnAverages = daysColl =>
    daysColl.map(d => ({
      ...d,
      highs: d.highs.reduce((total, n) => total + n) / d.highs.length,
      lows: d.lows.reduce((total, n) => total + n) / d.lows.length,
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

        // get averages for each category
        days = this.returnAverages(days);

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

  componentWillReceiveProps({ units }) {
    units !== this.props.units && this.fetchData(units);
  }

  componentDidMount() {
    this.fetchData(this.props.units);
  }

  render() {
    return (
      <div>
        {this.state.forecast.length < 1 ? (
          <Loading />
        ) : (
          <div className="five-day-forecast">
            <h3> Forecast in {this.props.name} </h3>
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
                      <br />
                      <div>
                        <img
                          src={`https://openweathermap.org/img/w/${icon}.png`}
                          alt="weather"
                        />
                        <p>{weather}</p>
                      </div>
                      <div>
                        <img
                          src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYVYTeX-IT8VF_M7yQQsClU2CQEJTXgoi8T9jaGhB66jpLWQSw`}
                          alt="high temperature"
                        />
                        {highs.toFixed(1)} &deg;{this.props.units}
                      </div>
                      <br />
                      <div>
                        <img
                          src={`https://lh3.googleusercontent.com/umbUE_DTWWiYad0I1ZB38WcSBFSLzSYYgKSJwTdHnjHHpuTMfvMoGHEiv4iPolyY-A=w300`}
                          alt="low temperature"
                        />
                        {lows.toFixed(1)} &deg;{this.props.units}
                      </div>
                      <br />

                      <br />
                      <div>
                        <img
                          src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLHQKHJiUm02mysUrvH8vaKDY-myNAYfRHCUFJgA-LSiNeOKn-`}
                          alt="wind"
                        />
                        {wind} m/ph
                      </div>
                      <br />
                      <div>
                        <img
                          src={`https://openweathermap.org/img/w/03d.png`}
                          alt="cloudiness"
                        />
                        {clouds.toFixed()}%
                      </div>
                      <br />
                      <div>
                        <img
                          src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe31uwyEa-r1R6ntqu4QPim6J6QQsIPqIrZ1RyEYebzC5esPGc`}
                          alt="barometric pressure"
                        />
                        {Number(pressure).toFixed()} hpa
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
