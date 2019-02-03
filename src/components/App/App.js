import React, { Component } from 'react';
import styled from 'styled-components';
import AirQualityReport from '../AirQualityReport';
import CurrentWeather from '../CurrentWeather';
import FiveDayForecast from '../FiveDayForecast';
import UnitsSwitcher from '../UnitsSwitcher';
import WeatherAlerts from '../WeatherAlerts';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  min-width: 927px;
`;

export default class App extends Component {
  render() {
    return (
      <AppWrapper>
        <h1>Current Weather and Forecast in Rome</h1>
        <UnitsSwitcher />
        <CurrentWeather />
        <FiveDayForecast />
        <Wrapper>
          <WeatherAlerts />
          <AirQualityReport />
        </Wrapper>
      </AppWrapper>
    );
  }
}
