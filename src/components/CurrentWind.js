import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class CurrentWind extends PureComponent {
  static propTypes = {
    wind: PropTypes.number.isRequired
  };

  render() {
    const { wind } = this.props;
    return (
      <div>
        <img
          src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLHQKHJiUm02mysUrvH8vaKDY-myNAYfRHCUFJgA-LSiNeOKn-`}
          alt="wind"
        />
        <h4>{wind} mph</h4>
      </div>
    );
  }
}
