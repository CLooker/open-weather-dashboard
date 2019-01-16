import React, { PureComponent } from 'react';
import { apiKey } from '../../utils';
import { IconAndText, Loading, Title } from '../common';
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
              pressure: accumulatedData.pressure + dataObj.precision,
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

  doesStateHaveData = () =>
    Object.values(this.state).some(pollutant =>
      Object.values(pollutant).some(value => value !== 0)
    );

  getAirQualityReportIconAndText = () => (
    <div className='air-quality-report-icon-and-text'>
      <IconAndText
        alt='air quality report'
        iconSrc='https://image.freepik.com/icones-gratis/fabrica-de-fumaca-eco_318-41523.jpg'
        text={<Title HeaderTag='h3' text='Air Quality Report' />}
      />
    </div>
  );

  getPollutantReports = () => (
    <div className='pollutant-reports-container'>
      {Object.entries(this.state).map(entry => {
        const [pollutant, data] = entry;
        return (
          <PollutantReport key={pollutant} pollutant={pollutant} data={data} />
        );
      })}
    </div>
  );

  render() {
    if (!this.doesStateHaveData()) return <Loading />;
    return (
      <div className='air-quality-report-icon-and-text-container'>
        {this.getAirQualityReportIconAndText()}
        {this.getPollutantReports()}
      </div>
    );
  }
}
