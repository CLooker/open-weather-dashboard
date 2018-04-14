import React, { PureComponent } from 'react';

export default class ForecastDay extends PureComponent {
  render() {
    const { day } = this.props;
    return (
      <p>
        <strong>{day}</strong>
      </p>
    );
  }
}
