import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { apiKey, handleConversion, farenheit, celsius } from '../../utils';
import { IconAndText, Loading, Title } from '../common';

export default class CurrentWeather extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    units: PropTypes.string.isRequired
  };

  state = {
    units: this.props.units,
    temp: '',
    iconCode: '',
    weather: ''
  };

  componentDidMount() {
    const handleFetchReturn = res =>
      this.setState({
        temp: res.main.temp,
        iconCode: res.weather[0].icon,
        weather: res.weather[0].main,
        wind: res.wind.speed,
        clouds: res.clouds.all,
        pressure: res.main.pressure
      });

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Rome&units=imperial&APPID=${apiKey}`
    )
      .then(res => res.json())
      .then(handleFetchReturn)
      .catch(console.error);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.units !== this.props.units) {
      this.setState({
        units: this.props.units,
        temp: handleConversion(prevState.temp, prevState.units)
      });
    }
  }

  getCurrentWeatherComponents = () => {
    const {
      weather,
      temp,
      wind,
      iconCode,
      clouds,
      pressure,
      units
    } = this.state;

    return [
      {
        titleAttr: 'Current Weather',
        iconSrc: `https://openweathermap.org/img/w/${iconCode}.png`,
        text: <Title HeaderTag='h4' text={weather} />
      },
      {
        titleAttr: 'Current Temperature',
        iconSrc:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYVYTeX-IT8VF_M7yQQsClU2CQEJTXgoi8T9jaGhB66jpLWQSw',

        text: (
          <Title
            HeaderTag='h4'
            text={`${temp.toFixed(1)} ${units === 'F' ? farenheit : celsius}`}
          />
        )
      },
      {
        titleAttr: 'Current Wind',
        iconSrc: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLHQKHJiUm02mysUrvH8vaKDY-myNAYfRHCUFJgA-LSiNeOKn-`,
        text: <Title HeaderTag='h4' text={`${wind} mph`} />
      },
      {
        titleAttr: 'Current Cloudiness',
        iconSrc: 'https://openweathermap.org/img/w/03d.png',
        text: <Title HeaderTag='h4' text={`${clouds}%`} />
      },
      {
        titleAttr: 'Current Barometric Pressure',
        iconSrc:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe31uwyEa-r1R6ntqu4QPim6J6QQsIPqIrZ1RyEYebzC5esPGc',
        text: <Title HeaderTag='h4' text={`${pressure} hpa`} />
      }
    ].map(props => <IconAndText key={props.titleAttr} {...props} />);
  };

  render() {
    const { name } = this.props;

    if (Object.values(this.state).some(value => value === '')) {
      return <Loading />;
    }

    return (
      <div className='current-weather-container'>
        <div className='current-weather'>
          <Title HeaderTag={'h3'} text={`Current Weather in ${name}`} />
          <div className='weather' style={{ display: 'flex' }}>
            {this.getCurrentWeatherComponents()}
          </div>
        </div>
      </div>
    );
  }
}
