import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class UnitsSwitcher extends Component {
  static propTypes = {
    name: PropTypes.string,
    setUnits: PropTypes.func.isRequired,
    units: PropTypes.string.isRequired
  };

  handleClick = e => this.props.setUnits(e.target.value.split('')[1]);

  render() {
    const { units } = this.props;
    return (
      <div className="unit-switcher">
        <div>
          <input
            type="button"
            value="&deg;C"
            style={{
              opacity: units === 'F' ? '.5' : '1'
            }}
            onClick={this.handleClick}
          />
          <input
            type="button"
            value="&deg;F"
            style={{
              opacity: units === 'C' ? '.5' : '1'
            }}
            onClick={this.handleClick}
          />
        </div>
      </div>
    );
  }
}
