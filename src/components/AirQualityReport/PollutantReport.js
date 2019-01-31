import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PollutantReportWrapper = styled.div`
  margin: 0 5px;
`;

const DataWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 15px;
  margin: 2px 0;
`;

const DataTitleWrapper = styled.h5`
  padding: 0 2px 0 0;
`;

export default class PollutantReport extends PureComponent {
  static propTypes = {
    pollutant: PropTypes.string,
    data: PropTypes.object
  };

  render() {
    const {
      pollutant,
      data: { value, pressure, precision }
    } = this.props;

    return (
      <PollutantReportWrapper>
        <strong title='Pollutant'>{pollutant.toUpperCase()}</strong>
        <DataWrapper>
          <DataTitleWrapper title='Mixing Ratio'>Value:</DataTitleWrapper>
          {value}
        </DataWrapper>
        <DataWrapper>
          <DataTitleWrapper title='Atmospheric Pressure'>
            Pressure:
          </DataTitleWrapper>
          {pressure} hPa
        </DataWrapper>
        <DataWrapper>
          <DataTitleWrapper title='Measurement Precision'>
            Precision:
          </DataTitleWrapper>
          {precision}
        </DataWrapper>
      </PollutantReportWrapper>
    );
  }
}
