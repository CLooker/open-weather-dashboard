import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const GetWeatherAlertsWrapper = styled.div`
  margin: 0 5px;
  padding: 0 0 0 10px;
  position: relative;
  bottom: 18px;
`;

export default class GetWeatherAlerts extends Component {
  static propTypes = {
    incrementTriggeredAlertsTotal: PropTypes.func.isRequired,
    registeredAlertsTotal: PropTypes.number,
    setRegisteredAlertsTotal: PropTypes.func.isRequired,
    triggeredAlertsTotal: PropTypes.number
  };

  componentDidMount() {
    const {
      incrementTriggeredAlertsTotal,
      setRegisteredAlertsTotal
    } = this.props;

    fetch(`api/alerts`)
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
      <GetWeatherAlertsWrapper>
        <h6>Registered Alerts: {registeredAlertsTotal}</h6>
        <h6>Triggered Alerts: {triggeredAlertsTotal}</h6>
      </GetWeatherAlertsWrapper>
    );
  }
}
