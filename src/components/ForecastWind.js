import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class FiveDayForecastCollWind extends PureComponent {
  static propTypes = {
    wind: PropTypes.number.isRequired
  };

  render() {
    const { wind } = this.props;
    return (
      <div title="Wind">
        <img
          src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLHQKHJiUm02mysUrvH8vaKDY-myNAYfRHCUFJgA-LSiNeOKn-`}
          alt="wind"
        />
        <p>{wind} m/ph</p>
      </div>
    );
  }
}
