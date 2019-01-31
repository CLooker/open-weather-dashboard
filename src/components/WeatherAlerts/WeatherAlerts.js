import React, { PureComponent } from 'react';
import CreateWeatherAlert from './CreateWeatherAlert';
import GetWeatherAlerts from './GetWeatherAlerts';
import { IconAndText } from '../common';

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
      <div
        style={{
          border: 'solid 1px lightgrey',
          borderRadius: '10px'
        }}
      >
        <IconAndText
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '10px'
          }}
          alt='alert'
          iconSrc={require('../../assets/alert.jpg')}
          text={<h3>Weather Alerts</h3>}
        />
        <div
          style={{
            display: 'flex'
          }}
        >
          <CreateWeatherAlert
            incrementRegisteredAlertsTotal={this.incrementRegisteredAlertsTotal}
          />
          <GetWeatherAlerts
            registeredAlertsTotal={registeredAlertsTotal}
            triggeredAlertsTotal={triggeredAlertsTotal}
            setRegisteredAlertsTotal={this.setRegisteredAlertsTotal}
            incrementTriggeredAlertsTotal={this.incrementTriggeredAlertsTotal}
          />
        </div>
      </div>
    );
  }
}
