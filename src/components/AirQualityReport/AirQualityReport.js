import React, { PureComponent } from 'react';
import { apiKey } from '../../utils';
import { IconAndText, Loading } from '../common';
import PollutantReport from './PollutantReport';

export default class AirQualityReport extends PureComponent {
  state = {
    co: {
      precision: 0,
      pressure: 0,
      value: 0
    },
    so2: {
      precision: 0,
      pressure: 0,
      value: 0
    }
  };

  componentDidMount() {
    Object.keys(this.state).forEach(pollutant => {
      fetch(
        `https://api.openweathermap.org/pollution/v1/${pollutant}/41,12/current.json?appid=${apiKey}`
      )
        .then(res => res.json())
        .then(res => {
          const { data } = res;
          const { length } = data;

          if (!data || !length) return;

          const accumulatedData = data.reduce(
            (accumulatedData, dataObj) => ({
              precision: accumulatedData.precision + dataObj.precision,
              pressure: accumulatedData.pressure + dataObj.pressure,
              value: accumulatedData.value + dataObj.value
            }),
            this.state[pollutant]
          );
          const averagedData = {
            precision: accumulatedData.precision / length,
            pressure: accumulatedData.pressure / length,
            value: accumulatedData.value / length
          };
          this.setState({ [pollutant]: averagedData });
        })
        .catch(console.err);
    });
  }

  getIsLoading = () =>
    Object.values(this.state).every(pollutant =>
      Object.values(pollutant).every(value => value === 0)
    );

  getAirQualityReportIconAndText = () => (
    <div>
      <IconAndText
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        alt='air quality report'
        iconSrc='https://image.freepik.com/icones-gratis/fabrica-de-fumaca-eco_318-41523.jpg'
        text={<h3>Air Quality Report</h3>}
      />
    </div>
  );

  getPollutantReports = () => (
    <div
      style={{
        listStyleType: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {Object.entries(this.state).map(entry => {
        const [pollutant, data] = entry;
        return (
          <PollutantReport key={pollutant} pollutant={pollutant} data={data} />
        );
      })}
    </div>
  );

  render() {
    if (this.getIsLoading()) return <Loading />;

    return (
      <div
        style={{
          border: 'solid 1px lightgrey',
          borderRadius: '10px',
          margin: '10px',
          padding: '15px 0 0'
        }}
      >
        {this.getAirQualityReportIconAndText()}
        {this.getPollutantReports()}
      </div>
    );
  }
}
