import React, { Component } from 'react';
import apiKey from '../api';
import PropTypes from 'prop-types';

export default class GetWeatherAlerts extends Component {
  static propTypes = {
    registeredAlerts: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    triggeredAlerts: PropTypes.array.isRequired,
    updateRegisteredAlerts: PropTypes.func.isRequired,
    updateTriggeredAlerts: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.fetchAlerts();
  }

  fetchAlerts() {
    const { updateRegisteredAlerts, updateTriggeredAlerts } = this.props;

    fetch(`https://api.openweathermap.org/data/3.0/triggers?&APPID=${apiKey}`)
      .then(res => res.json())
      .then(res => {
        updateRegisteredAlerts(res);

        res.forEach(({ alerts }) => {
          if (Object.keys(alerts).length > 0) {
            updateTriggeredAlerts(alerts);
          }
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="get-weather-alerts">
        <h6>Registered Alerts: {this.props.registeredAlerts}</h6>
        <h6>Triggered Alerts: {this.props.triggeredAlerts.length}</h6>
      </div>
    );
  }
}
