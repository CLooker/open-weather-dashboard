import React, { Component } from 'react';
import apiKey from '../api';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class CreateWeatherAlert extends Component {
  static propTypes = {
    incrementRegisteredAlerts: PropTypes.func.isRequired
  };

  state = {
    query: '',
    units: '',
    message: ''
  };

  getBody = ({ start, query, units }) => ({
    time_period: {
      start: {
        expression: 'after',
        amount: start
      },
      end: {
        expression: 'after',
        amount: moment(start)
          .add(1, 'week')
          .valueOf()
      }
    },
    conditions: [
      {
        name: 'temp',
        expression: '$gt',
        amount: this.handleConversion({ query, units })
      }
    ],
    area: [
      {
        type: 'Point',
        coordinates: [41.9, 12.5]
      }
    ]
  });

  handleInputChange = e =>
    this.setState({
      query: e.target.value
    });

  handleUnitsChange = e =>
    this.setState({
      units: e.target.value
    });

  handleSubmit = e => {
    const { query, units } = this.state;
    e.preventDefault();
    if (this.validate(query, units)) {
      this.setState({
        message: ''
      });
      fetch(
        `http://api.openweathermap.org/data/3.0/triggers?&APPID=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            this.getBody({ query, units, start: moment().valueOf() })
          )
        }
      )
        .then(res => res.json())
        .then(res => this.afterFormSubmit({ type: 'success' }))
        .catch(err => {
          console.log(err);
          this.afterFormSubmit({ type: 'failure' });
        });
    }
  };

  afterFormSubmit = ({ type }) => {
    type === 'success'
      ? this.setState(prevState => ({
          query: '',
          units: '',
          message: 'Success.'
        })) || this.props.incrementRegisteredAlerts()
      : this.setState({
          query: '',
          units: '',
          message: 'Something went wrong.'
        });
  };

  validate = (temp, units) =>
    this.validateInput(temp) && this.validateUnits(units);

  validateInput = input =>
    !input || isNaN(input)
      ? alert('Please enter a number for temperature.') || false
      : true;

  validateUnits = units =>
    !units ? alert('Please select units.') || false : true;

  handleConversion = ({ query, units }) => {
    switch (units) {
      case 'C':
        return parseInt(query, 10) + 273.15;
      case 'F':
        return (parseInt(query, 10) + 459.67) * (5 / 9);
      default:
        return parseInt(query, 10);
    }
  };

  render() {
    const { query, units, message } = this.state;
    return (
      <div className="create-weather-alert-container">
        <div className="create-weather-alert">
          <div className="create-weather-alert-title-icon">
            <img
              src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYVYTeX-IT8VF_M7yQQsClU2CQEJTXgoi8T9jaGhB66jpLWQSw`}
              alt="Icon depicting current weather"
            />
            <p>Create Max Temperature Alert</p>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <input
                type="text"
                onChange={this.handleInputChange}
                value={query}
              />
              <select onChange={this.handleUnitsChange} value={units}>
                <option value="" />
                <option value="F">&deg;F</option>
                <option value="C">&deg;C</option>
                <option value="K">&deg;K</option>
              </select>
            </div>
            <input type="submit" value="Submit" />
          </form>
          <div>
            <h5>{message}</h5>
          </div>
        </div>
      </div>
    );
  }
}
