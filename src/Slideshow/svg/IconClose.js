import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const IconClose = (props) => {
  const classes = classNames({
    icon: true,
    'icon-close': true,
    [props.elementClass]: props.elementClass
  });

  return (
    <svg
      className={classes}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 8.586l-7.071-7.071-1.414 1.414 7.071 7.071-7.071 7.071 1.414 1.414 7.071-7.071 7.071 7.071 1.414-1.414-7.071-7.071 7.071-7.071-1.414-1.414-7.071 7.071z" />
    </svg>
  );
};

IconClose.propTypes = {
  elementClass: PropTypes.string
};

export default IconClose;
