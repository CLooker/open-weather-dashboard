import React, { PureComponent } from 'react';
import styled from 'styled-components';
import CreateWeatherAlert from './CreateWeatherAlert';
import GetWeatherAlerts from './GetWeatherAlerts';
import { IconAndText } from '../common';

const WeatherAlertsWrapper = styled.div`
  border: solid 1px lightgrey;
  border-radius: 10px;
`;

const IconAndTextWrapper = styled(IconAndText)`
  display: flex;
  justify-content: center;
  margin: 10px;
`;

const Wrapper = styled.div`
  display: flex;
`;

export default class WeatherAlerts extends PureComponent {
  state = {
    registeredAlertsTotal: null,
    triggeredAlertsTotal: null
  };

  incrementRegisteredAlertsTotal = () =>
    this.setState(({ registeredAlertsTotal }) => ({
      registeredAlertsTotal: ++registeredAlertsTotal
    }));

  setRegisteredAlertsTotal = registeredAlertsTotal =>
    this.setState({ registeredAlertsTotal });

  incrementTriggeredAlertsTotal = () =>
    this.setState(({ triggeredAlertsTotal }) => ({
      triggeredAlertsTotal: ++triggeredAlertsTotal
    }));

  render() {
    const { registeredAlertsTotal, triggeredAlertsTotal } = this.state;
    return (
      <WeatherAlertsWrapper>
        <IconAndTextWrapper
          alt='alert'
          iconSrc={require('../../assets/alert.jpg')}
          text={<h3>Weather Alerts</h3>}
        />
        <Wrapper>
          <CreateWeatherAlert
            incrementRegisteredAlertsTotal={this.incrementRegisteredAlertsTotal}
          />
          <GetWeatherAlerts
            registeredAlertsTotal={registeredAlertsTotal}
            triggeredAlertsTotal={triggeredAlertsTotal}
            setRegisteredAlertsTotal={this.setRegisteredAlertsTotal}
            incrementTriggeredAlertsTotal={this.incrementTriggeredAlertsTotal}
          />
        </Wrapper>
      </WeatherAlertsWrapper>
    );
  }
}
