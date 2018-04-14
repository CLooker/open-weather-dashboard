import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FiveDayForecastListItem from './FiveDayForecastListItem';

export default class FiveDayForecastColl extends Component {
  static propTypes = {
    forecast: PropTypes.array.isRequired,
    units: PropTypes.string.isRequired
  };

  returnFiveDayForecastListItemProps = ({
    day,
    icon,
    weather,
    high,
    low,
    wind,
    clouds,
    pressure,
    units
  }) => ({
    day,
    icon,
    weather,
    high,
    low,
    wind: Number(wind),
    clouds,
    pressure,
    units
  });

  render() {
    const { forecast, units } = this.props;
    return (
      <ul className="forecast">
        {forecast.map(f => {
          const { day, icon, weather, high, low, wind, clouds, pressure } = f;
          const props = this.returnFiveDayForecastListItemProps({
            day,
            icon,
            weather,
            high,
            low,
            wind,
            clouds,
            pressure,
            units
          });
          return <FiveDayForecastListItem key={day} {...props} />;
        })}
      </ul>
    );
  }
}
