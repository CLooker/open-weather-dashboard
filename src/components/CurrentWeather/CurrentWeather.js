import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import thermometerIcon from '../../assets/thermometer.png';
import windIcon from '../../assets/wind.png';
import cloudIcon from '../../assets/cloud.png';
import barometerIcon from '../../assets/barometer.png';
import { apiKey, handleConversion, farenheit, celsius } from '../../utils';
import { IconAndText, Loading } from '../common';

const CurrentWeatherWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid lightgrey;
  border-radius: 10px;
  text-align: center;
`;

export default class CurrentWeather extends PureComponent {
  static propTypes = {
    units: PropTypes.string.isRequired
  };

  state = {
    units: this.props.units,
    temp: '',
    iconCode: '',
    weather: ''
  };

  componentDidMount() {
    const handleResponse = res =>
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
      .then(handleResponse)
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

  getIsLoading = () => Object.values(this.state).some(value => value === '');

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

    const iconAndTextPropsArr = [
      {
        titleAttr: 'Current Weather',
        iconSrc: `https://openweathermap.org/img/w/${iconCode}.png`,
        text: <h4>{weather}</h4>
      },
      {
        titleAttr: 'Current Temperature',
        iconSrc: thermometerIcon,
        text: (
          <h4>
            {temp.toFixed(1)} {units === 'F' ? farenheit : celsius}
          </h4>
        )
      },
      {
        titleAttr: 'Current Wind',
        iconSrc: windIcon,
        text: <h4>{wind} mph</h4>
      },
      {
        titleAttr: 'Current Cloudiness',
        iconSrc: cloudIcon,
        text: <h4>{clouds}%</h4>
      },
      {
        titleAttr: 'Current Barometric Pressure',
        iconSrc: barometerIcon,
        text: <h4>{pressure} hpa</h4>
      }
    ];

    const Wrapper = styled.div`
      display: flex;
    `;

    const IconAndTextWrapper = styled(IconAndText)`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0 40px;
    `;

    return (
      <Wrapper>
        {iconAndTextPropsArr.map(iconAndTextProps => (
          <IconAndTextWrapper
            key={iconAndTextProps.titleAttr}
            {...iconAndTextProps}
          />
        ))}
      </Wrapper>
    );
  };

  render() {
    if (this.getIsLoading()) return <Loading />;

    return (
      <CurrentWeatherWrapper>
        <div>
          <h3>Current Weather</h3>
          {this.getCurrentWeatherComponents()}
        </div>
      </CurrentWeatherWrapper>
    );
  }
}
