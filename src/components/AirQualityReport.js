import React, { Component } from 'react';
import Loading from './Loading';
import PollutantStats from './PollutantStats';
import apiKey from '../api';

export default class AirQualityReport extends Component {
  state = {
    co: {},
    o3: {},
    so2: {},
    no2: {}
  };

  isThereAnyLocalInfo = () =>
    Object.keys(this.state) // state keys
      .map(key => this.state[key]) // state key vals
      .map(obj => Object.keys(obj).length) // coll of state key val lenghts
      .some(l => l > 0); // check if any are non-zero

  componentDidMount() {
    Object.keys(this.state).forEach(key => {
      fetch(
        `http://api.openweathermap.org/pollution/v1/${key}/41,12/current.json?appid=${apiKey}`
      )
        .then(res => res.json())
        .then(
          res =>
            res.message !== 'not found' && this.setState({ [key]: res.data[0] })
        )
        .catch(err => console.log(err));
    });
  }

  render() {
    return (
      <div className="air-quality-report-container">
        {!this.isThereAnyLocalInfo() ? (
          <Loading />
        ) : (
          <div className="air-quality-report">
            <div>
              <img
                src="https://image.freepik.com/icones-gratis/fabrica-de-fumaca-eco_318-41523.jpg"
                alt="pollution"
              />
              <h3>Air Quality Report</h3>
            </div>
            <div className="chem-container">
              {Object.keys(this.state).map(chem => {
                return (
                  Object.keys(this.state[chem]).length > 0 && (
                    <PollutantStats
                      key={chem}
                      type={chem}
                      chem={this.state[chem]}
                    />
                  )
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}
