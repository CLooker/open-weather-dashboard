import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  apiKey,
  compose,
  getAverage,
  handleConversion,
  celsius,
  farenheit
} from '../../utils';
import { IconAndText, Loading } from '../common';

export default class forecasts extends PureComponent {
  static propTypes = {
    units: PropTypes.string.isRequired
  };

  state = {
    forecasts: []
  };

  componentDidMount() {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?id=6539761&units=imperial&APPID=${apiKey}`
    )
      .then(res => res.json())
      .then(this.handleResponse)
      .catch(console.error);
  }

  componentDidUpdate(prevProps) {
    const { units } = prevProps;
    if (units !== this.props.units) {
      this.setState(({ forecasts }) => ({
        forecasts: forecasts.map(f => ({
          ...f,
          high: handleConversion(f.high, units),
          low: handleConversion(f.low, units)
        }))
      }));
    }
  }

  handleResponse = res => {
    // add day key/value to help us
    res.list = res.list.map(forecast => ({
      ...forecast,
      day: moment(forecast.dt_txt).format('dddd MMM Do YY')
    }));

    const butTodaysForecasts = (() => {
      const today = moment().format('dddd MMM Do YY');
      return res.list.filter(forecast => forecast.day !== today);
    })();

    const getForecastDays = butTodaysForecasts =>
      butTodaysForecasts.reduce((forecastDays, forecast) => {
        const { day } = forecast;

        return forecastDays.includes(day)
          ? forecastDays
          : [...forecastDays, day];
      }, []);

    const getForecastsWithSchema = forecastDays =>
      forecastDays.map(forecastDay => ({
        day: forecastDay,
        high: null,
        low: null,
        weather: [],
        wind: [],
        clouds: [],
        pressure: [],
        icon: null
      }));

    const getForecastsWithData = forecastsWithSchema => {
      const getTemp = ({ isHigh, dayTemp, forecastTemp }) => {
        switch (true) {
          case dayTemp === null:
            return forecastTemp;
          case isHigh:
            return forecastTemp > dayTemp ? forecastTemp : dayTemp;
          default:
            return forecastTemp < dayTemp ? forecastTemp : dayTemp;
        }
      };

      return butTodaysForecasts.reduce(
        (forecasts, f1) =>
          forecasts.map(f2 => {
            const isSameDay = f1.day === f2.day;
            return isSameDay
              ? {
                  ...f2,
                  high: getTemp({
                    isHigh: true,
                    dayTemp: f2.high,
                    forecastTemp: f1.main.temp_max
                  }),
                  low: getTemp({
                    isHigh: false,
                    dayTemp: f2.low,
                    forecastTemp: f1.main.temp_min
                  }),
                  weather: [...f2.weather, f1.weather[0].description],
                  wind: [...f2.wind, f1.wind.speed],
                  clouds: [...f2.clouds, f1.clouds.all],
                  pressure: [...f2.pressure, f1.main.pressure]
                }
              : f2;
          }),
        [...forecastsWithSchema]
      );
    };

    const getForecastsAveraged = forecastsWithData =>
      forecastsWithData.map(forecastWithData => ({
        ...forecastWithData,
        wind: getAverage(forecastWithData.wind).toFixed(1),
        clouds: getAverage(forecastWithData.clouds),
        pressure: getAverage(forecastWithData.pressure)
      }));

    const getForecastsWithWeatherDescription = forecastsAveraged => {
      const getMostFrequentDescription = descriptions =>
        descriptions.reduce((x, description) => {
          const myFreq = descriptions.filter(d => d === description).length;
          const bestFreq = descriptions.filter(d => x === d).length;
          return myFreq > bestFreq ? description : x;
        }, descriptions[0]);

      return forecastsAveraged.reduce(
        (forecasts, d) => [
          ...forecasts,
          {
            ...d,
            weather: getMostFrequentDescription(d.weather)
          }
        ],
        []
      );
    };

    const getForecastsWithIconCode = forecastsWithWeatherDescription => {
      const getIcon = forecast => forecast.weather[0].icon;

      return forecastsWithWeatherDescription.map(forecast => ({
        ...forecast,
        icon: getIcon(
          butTodaysForecasts.find(
            f => f.weather[0].description === forecast.weather
          )
        )
      }));
    };

    this.setState({
      // store the result of our fn composition
      forecasts: compose(
        getForecastsWithIconCode, // get forecasts with iconCode based on most frequent weather description per day
        getForecastsWithWeatherDescription, // get forecasts with most frequent weather description per day
        getForecastsAveraged, // get forecasts with averages for wind, cloudiness, hpa
        getForecastsWithData, // get forecasts with schema that have some data
        getForecastsWithSchema, // get forecasts with the data schema they will need
        getForecastDays // get forecast days
      )(butTodaysForecasts)
    });
  };

  render() {
    const { units } = this.props;
    const { forecasts } = this.state;

    if (!forecasts.length) return <Loading />;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '1px solid lightgrey',
          margin: '15px 25px',
          borderRadius: '10px'
        }}
      >
        <h3
          style={{
            margin: '20px 0 -1px',
            padding: '0 0 10px'
          }}
        >
          Forecast
        </h3>
        <ul
          style={{
            listStyleType: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0'
          }}
        >
          {forecasts.map(forecast => {
            const {
              day,
              icon,
              weather,
              high,
              low,
              wind,
              clouds,
              pressure
            } = forecast;

            return (
              <li
                key={day}
                style={{
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  minWidth: '185px'
                }}
              >
                <div>
                  <h4>{day.slice(0, day.length - 2)}</h4>
                  <IconAndText
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                    titleAttr='Weather Forecast'
                    text={<p>{weather}</p>}
                    iconStyle={{ padding: '0 5px 0' }}
                    iconSrc={`https://openweathermap.org/img/w/${icon}.png`}
                  />
                  <br />
                  <IconAndText
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                    titleAttr='High Temperature'
                    iconStyle={{ padding: '0 5px 0' }}
                    iconSrc={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYVYTeX-IT8VF_M7yQQsClU2CQEJTXgoi8T9jaGhB66jpLWQSw`}
                    text={`${high.toFixed(1)} ${
                      units === 'F' ? farenheit : celsius
                    }`}
                  />
                  <br />
                  <IconAndText
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                    titleAttr='Low Temperature'
                    iconSrc={`https://lh3.googleusercontent.com/umbUE_DTWWiYad0I1ZB38WcSBFSLzSYYgKSJwTdHnjHHpuTMfvMoGHEiv4iPolyY-A=w300`}
                    text={`${low.toFixed(1)} ${
                      units === 'F' ? farenheit : celsius
                    }`}
                  />
                  <br />
                  <IconAndText
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                    titleAttr='Wind'
                    iconStyle={{ padding: '0 5px 0' }}
                    iconSrc={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLHQKHJiUm02mysUrvH8vaKDY-myNAYfRHCUFJgA-LSiNeOKn-`}
                    text={`${wind} m/ph`}
                  />
                  <br />
                  <IconAndText
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                    titleAttr='Cloudiness'
                    iconStyle={{ padding: '0 5px 0' }}
                    iconSrc={`https://openweathermap.org/img/w/03d.png`}
                    text={`${clouds.toFixed()}%`}
                  />
                  <br />
                  <IconAndText
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                    titleAttr='Barometric Pressure'
                    iconStyle={{ padding: '0 5px 0' }}
                    iconSrc={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe31uwyEa-r1R6ntqu4QPim6J6QQsIPqIrZ1RyEYebzC5esPGc`}
                    text={`${pressure.toFixed()} hpa`}
                  />
                </div>
                <br />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
