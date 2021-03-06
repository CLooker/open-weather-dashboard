import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { IconAndText } from '../common';

const CreateWeatherAlertWrapper = styled.div``;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const IconAndTextWrapper = styled(IconAndText)`
  margin: 5px 0 10px 0;
  display: flex;
`;

const SubmitWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 5px 0 0;
`;

export default class CreateWeatherAlert extends Component {
  static propTypes = {
    incrementRegisteredAlertsTotal: PropTypes.func.isRequired
  };

  state = {
    alertTemperature: '',
    displayMessage: '',
    units: ''
  };

  setAlertTemperature = e =>
    this.setState({
      alertTemperature: e.target.value
    });

  setUnits = e =>
    this.setState({
      units: e.target.value
    });

  getReqBody = () => {
    const now = moment().valueOf();

    return JSON.stringify({
      // from now until 1 week
      time_period: {
        start: {
          expression: 'after',
          amount: now
        },
        end: {
          expression: 'before',
          amount: moment(now)
            .add(1, 'week')
            .valueOf()
        }
      },
      conditions: [
        {
          name: 'temp',
          expression: '$gt',
          amount: this.handleTempConversion()
        }
      ],
      area: [
        {
          type: 'Point',
          coordinates: [41.9, 12.5]
        }
      ]
    });
  };

  handleTempConversion = () => {
    const { alertTemperature, units } = this.state;
    switch (units) {
      case 'C':
        return +alertTemperature + 273.15;
      case 'F':
        return (+alertTemperature + 459.67) * (5 / 9);
      default:
        return +alertTemperature;
    }
  };

  handleSubmit = async e => {
    e.preventDefault();

    if (!this.isValidInput()) return;

    this.setState({ displayMessage: '' });

    try {
      let res = await fetch(`api/alerts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: this.getReqBody()
      });

      res = await res.json();

      this.handleSubmitResponse(res);
    } catch (e) {
      this.handleSubmitResponse(e);
    }
  };

  isValidInput = () => {
    const { alertTemperature, units } = this.state;

    const isValidTemp = (() => {
      if (alertTemperature && Number.isInteger(+alertTemperature)) return true;

      alert('Please enter an integer for creating a weather alert.');
      return false;
    })();
    if (!isValidTemp) return false;

    const isValidUnits = (() => {
      if (units) return true;

      alert('Please select temperature units for creating a weather alert.');
      return false;
    })();

    return isValidUnits;
  };

  handleSubmitResponse = response => {
    const { incrementRegisteredAlertsTotal } = this.props;

    const isError = !response._id;

    isError ? console.error(response) : incrementRegisteredAlertsTotal();

    this.setState({
      displayMessage: isError ? 'Something went wrong.' : 'Success.'
    });

    setTimeout(
      () =>
        this.setState({ alertTemperature: '', displayMessage: '', units: '' }),
      10000
    );
  };

  render() {
    const { alertTemperature, displayMessage, units } = this.state;

    return (
      <CreateWeatherAlertWrapper>
        <Wrapper>
          <IconAndTextWrapper
            iconStyle={{ width: '25px', height: '25px' }}
            titleAttr={'create alert'}
            iconSrc='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYVYTeX-IT8VF_M7yQQsClU2CQEJTXgoi8T9jaGhB66jpLWQSw'
            text={'Create Max Temperature Alert'}
          />
          <form onSubmit={this.handleSubmit}>
            <div>
              <input
                type='text'
                onChange={this.setAlertTemperature}
                value={alertTemperature}
              />
              <select onChange={this.setUnits} value={units}>
                <option value='' />
                <option value='F'>&deg;F</option>
                <option value='C'>&deg;C</option>
                <option value='K'>&deg;K</option>
              </select>
            </div>
            <SubmitWrapper>
              <input type='submit' value='Submit' />
            </SubmitWrapper>
          </form>
          <div>
            <h5>{displayMessage}</h5>
          </div>
        </Wrapper>
      </CreateWeatherAlertWrapper>
    );
  }
}
