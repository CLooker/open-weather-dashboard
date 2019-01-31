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
`;

export default class App extends Component {
  state = {
    units: 'F'
  };

  setUnits = units => this.setState({ units });

  render() {
    const { units } = this.state;

    return (
      <AppWrapper>
        <h1>Current Weather and Forecast in Rome</h1>
        <UnitsSwitcher setUnits={this.setUnits} units={units} />
        <CurrentWeather units={units} />
        <FiveDayForecast units={units} />
        <Wrapper>
          <WeatherAlerts />
          <AirQualityReport />
        </Wrapper>
      </AppWrapper>
    );
  }
}
