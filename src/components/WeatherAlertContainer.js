import React, { Component } from 'react';
import CreateWeatherAlert from './CreateWeatherAlert';
import GetWeatherAlerts from './GetWeatherAlerts';

export default class WeatherAlertContainer extends Component {
  state = {
    registeredAlerts: null,
    triggeredAlerts: []
  };

  incrementRegisteredAlerts = () => {
    this.setState(({ registeredAlerts }) => ({
      registeredAlerts: ++registeredAlerts
    }));
  };

  updateRegisteredAlerts = ({ length }) => {
    this.setState({ registeredAlerts: length });
  };

  updateTriggeredAlerts = alerts => {
    this.setState(prevState => ({
      triggeredAlerts: [...prevState.triggeredAlerts, ...alerts]
    }));
  };

  render() {
    const { registeredAlerts, triggeredAlerts } = this.state;
    return (
      <div className="weather-alert-container">
        <div className="weather-alert-container-title-icon">
          <img
            src="https://cloudcheckr.com/wp-content/uploads/2015/12/alert.jpg"
            alt="alert"
          />
          <h3>Weather Alerts</h3>
        </div>
        <div className="alert-container">
          <CreateWeatherAlert
            incrementRegisteredAlerts={this.incrementRegisteredAlerts}
          />
          <GetWeatherAlerts
            registeredAlerts={registeredAlerts}
            triggeredAlerts={triggeredAlerts}
            updateRegisteredAlerts={this.updateRegisteredAlerts}
            updateTriggeredAlerts={this.updateTriggeredAlerts}
          />
        </div>
      </div>
    );
  }
}
