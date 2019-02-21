import React, { PureComponent } from 'react';
import styled from 'styled-components';
import factoryIcon from '../../assets/factory.jpg';
import { IconAndText, Loading } from '../common';
import PollutantData from './PollutantData';

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

  async componentDidMount() {
    const res = await fetch(`api/pollution`);
    const pollutants = await res.json();
    this.setState(pollutants);
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
          iconSrc={factoryIcon}
          text={<h3>Air Quality Report</h3>}
        />
      </div>
    );
  };

  getPollutantData = () => {
    const PollutantDataWrapper = styled.div`
      list-style-type: none;
      display: flex;
      justify-content: center;
      align-items: center;
    `;

    return (
      <PollutantDataWrapper>
        {Object.entries(this.state).map(entry => {
          const [pollutant, data] = entry;
          return (
            <PollutantData key={pollutant} pollutant={pollutant} data={data} />
          );
        })}
      </PollutantDataWrapper>
    );
  };

  render() {
    if (this.getIsLoading()) return <Loading />;

    return (
      <AirQualityReportWrapper>
        {this.getAirQualityReportIconAndText()}
        {this.getPollutantData()}
      </AirQualityReportWrapper>
    );
  }
}
