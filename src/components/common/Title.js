import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Title extends PureComponent {
  static propTypes = {
    HeaderTag: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  };

  render() {
    const { HeaderTag, text } = this.props;
    return <HeaderTag>{text}</HeaderTag>;
  }
}
