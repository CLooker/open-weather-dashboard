import React, { Component } from 'react';
import Loading from './Loading';
import handleConversion from '../utils/handleConversion.js';
import FiveDayForecastTitle from './FiveDayForecastTitle';
import FiveDayForecastColl from './FiveDayForecastColl';
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

  fetchData(units) {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?id=6539761&units=${this.returnUnitsString(
        units
      )}&APPID=${apiKey}`
    )
      .then(res => res.json())
      .then(this.handleFetchReturn)
      .catch(console.error);
  }

  compareUnits = units => units !== this.props.units;

  updateForecastTemps = prevUnits =>
    this.setState(({ forecast }) => ({
      forecast: forecast.map(f => ({
        ...f,
        high: handleConversion(f.high, prevUnits),
        low: handleConversion(f.low, prevUnits)
      }))
    }));

  returnUnitsString = units => (units === 'F' ? 'imperial' : 'metric');

  removeToday = ({ list }) => {
    const today = moment().format('dddd MMM Do YY');
    return list.filter(
      f => moment(f.dt_txt).format('dddd MMM Do YY') !== today
    );
  };

  prepareDaysCollForData = daysColl =>
    daysColl.map(d => ({
      day: d,
      high: -1000,
      low: 1000,
      weather: [],
      wind: [],
      clouds: [],
      pressure: [],
      icon: null
    }));

  returnSummarizedData = daysColl =>
    daysColl.map(d => ({
      ...d,
      wind: (d.wind.reduce((total, n) => total + n) / d.wind.length).toFixed(1),
      clouds: d.clouds.reduce((total, n) => total + n) / d.clouds.length,
      pressure: d.pressure.reduce((total, n) => total + n) / d.pressure.length
    }));

  handleFetchReturn = res => {
    // cull forecasts that are from today
    const forecastsNotForToday = [...this.removeToday(res)];

    // collection of the next five days
    const fiveDayForecastDays = forecastsNotForToday.reduce((days, f) => {
      f.day = moment(f.dt_txt).format('dddd MMM Do YY');
      return days.includes(f.day) ? days : [...days, f.day];
    }, []);

    // add props to each day
    // where we will accumulate renderable data
    const emptyFiveDayForecast = this.prepareDaysCollForData(
      fiveDayForecastDays
    );

    // accumulate values in our forecast coll
    // from our weather info making sure to place
    // data in the correct day
    const startToPopulateData = forecastsNotForToday.reduce(
      (fiveDayForecast, f) =>
        fiveDayForecast.map(
          d =>
            f.day === d.day
              ? {
                  ...d,
                  high: f.main.temp_max > d.high ? f.main.temp_max : d.high,
                  low: f.main.temp_min < d.low ? f.main.temp_min : d.low,
                  weather: [...d.weather, f.weather[0].description],
                  wind: [...d.wind, f.wind.speed],
                  clouds: [...d.clouds, f.clouds.all],
                  pressure: [...d.pressure, f.main.pressure]
                }
              : d
        ),
      [...emptyFiveDayForecast]
    );

    // compute averages
    const forecastDataSummarized = this.returnSummarizedData(
      startToPopulateData
    );

    // descriptions become keys that have a value that starts as 1
    // everytime that key is encountered, the value is incremented
    // this is how we will decide which description to use for the day
    // and the description is how we choose our iconCode
    const forecastWithWeatherDescriptions = forecastDataSummarized.reduce(
      (forecasts, d) => [
        ...forecasts,
        {
          ...d,
          weather: d.weather.reduce(
            (descriptions, w) =>
              descriptions[w]
                ? { ...descriptions, [w]: descriptions[w] + 1 }
                : { ...descriptions, [w]: 1 },
            {}
          )
        }
      ],
      []
    );

    // find most common description per day
    // use that to pick our iconCode
    const forecastWithReducedWeatherAndIcon = forecastWithWeatherDescriptions
      .map(d => ({
        ...d,
        weather: Object.keys(d.weather).find(
          key =>
            d.weather[key] ===
            Object.keys(d.weather)
              .map(key => d.weather[key])
              .sort((a, b) => b - a)[0]
        )
      }))
      .map(d => ({
        ...d,
        icon: forecastsNotForToday.reduce(
          (icon, day) =>
            day.weather[0].description === d.weather
              ? day.weather[0].icon
              : icon,
          null
        )
      }));

    // set our state
    this.setState({
      forecast: forecastWithReducedWeatherAndIcon
    });
  };

  render() {
    const { forecast } = this.state;
    const { name } = this.props;
    return (
      <div>
        {forecast.length < 1 ? (
          <Loading />
        ) : (
          <div className="five-day-forecast">
            <FiveDayForecastTitle name={name} />
            <FiveDayForecastColl forecast={forecast} units={this.props.units} />
          </div>
        )}
      </div>
    );
  }
}
