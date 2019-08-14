import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const IconShrink = (props) => {
  const classes = classNames({
    icon: true,
    'icon-shrink': true,
    [props.elementClass]: props.elementClass
  });

  return (
    <svg
      className={classes}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14 18v13l-5-5-6 6-3-3 6-6-5-5zM32 3l-6 6 5 5h-13v-13l5 5 6-6z" />
    </svg>
  );
};

IconShrink.propTypes = {
  elementClass: PropTypes.string
};

export default IconShrink;
