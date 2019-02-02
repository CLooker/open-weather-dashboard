import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { apiKey } from '../../utils';
import { IconAndText, Loading } from '../common';
import PollutantReport from './PollutantReport';

const AirQualityReportWrapper = styled.div`
  border: solid 1px lightgrey;
  border-radius: 10px;
  padding: 15px 0 0;
`;

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

  getAirQualityReportIconAndText = () => {
    const IconAndTextWrapper = styled(IconAndText)`
      display: flex;
      justify-content: center;
      align-items: 'center';
    `;

    return (
      <div>
        <IconAndTextWrapper
          alt='air quality report'
          iconSrc='https://image.freepik.com/icones-gratis/fabrica-de-fumaca-eco_318-41523.jpg'
          text={<h3>Air Quality Report</h3>}
        />
      </div>
    );
  };

  getPollutantReports = () => {
    const PollutantReportsWrapper = styled.div`
      list-style-type: none;
      display: flex;
      justify-content: center;
      align-items: center;
    `;

    return (
      <PollutantReportsWrapper>
        {Object.entries(this.state).map(entry => {
          const [pollutant, data] = entry;
          return (
            <PollutantReport
              key={pollutant}
              pollutant={pollutant}
              data={data}
            />
          );
        })}
      </PollutantReportsWrapper>
    );
  };

  render() {
    if (this.getIsLoading()) return <Loading />;

    return (
      <AirQualityReportWrapper>
        {this.getAirQualityReportIconAndText()}
        {this.getPollutantReports()}
      </AirQualityReportWrapper>
    );
  }
}
