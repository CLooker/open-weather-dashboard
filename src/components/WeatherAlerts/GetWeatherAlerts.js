import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { apiKey } from '../../utils';

export default class GetWeatherAlerts extends Component {
  static propTypes = {
    incrementTriggeredAlertsTotal: PropTypes.func.isRequired,
    registeredAlertsTotal: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    setRegisteredAlertsTotal: PropTypes.func.isRequired,
    triggeredAlertsTotal: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  };

  componentDidMount() {
    const {
      incrementTriggeredAlertsTotal,
      setRegisteredAlertsTotal
    } = this.props;

    fetch(`https://api.openweathermap.org/data/3.0/triggers?&APPID=${apiKey}`)
      .then(res => res.json())
      .then(res => {
        setRegisteredAlertsTotal(res.length);

        res.forEach(({ alerts }) => {
          if (Object.keys(alerts).length) incrementTriggeredAlertsTotal(alerts);
        });
      })
      .catch(console.err);
  }

  render() {
    const { registeredAlertsTotal, triggeredAlertsTotal } = this.props;
    return (
      <div className='get-weather-alerts'>
        <h6>Registered Alerts: {registeredAlertsTotal}</h6>
        <h6>Triggered Alerts: {triggeredAlertsTotal}</h6>
      </div>
    );
  }
}
