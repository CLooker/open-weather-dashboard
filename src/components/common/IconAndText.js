import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class IconAndText extends PureComponent {
  static propTypes = {
    titleAttr: PropTypes.string,
    iconSrc: PropTypes.string.isRequired,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
  };

  render() {
    const { alt, className, titleAttr, iconSrc, text } = this.props;
    return (
      <div className={className} title={titleAttr}>
        <img
          src={iconSrc}
          alt={alt || `${titleAttr && titleAttr.toLowerCase()} icon`}
        />
        {text}
      </div>
    );
  }
}
