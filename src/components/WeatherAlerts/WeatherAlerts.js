import React, { PureComponent } from 'react';
import CreateWeatherAlert from './CreateWeatherAlert';
import GetWeatherAlerts from './GetWeatherAlerts';
import { IconAndText, Title } from '../common';

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
      <div className='weather-alerts-container'>
        <IconAndText
          alt='alert'
          iconSrc={require('../../assets/alert.jpg')}
          text={<Title HeaderTag='h3' text='Weather Alerts' />}
        />
        <div className='alert-container'>
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
