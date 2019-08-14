import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const IconFullscreen = (props) => {
  const classes = classNames({
    icon: true,
    'icon-fullscreen': true,
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
      <path d="M6.987 10.987l-2.931 3.031-2.056-2.429v6.411h6.387l-2.43-2.081 3.030-2.932-2-2zM11.613 2l2.43 2.081-3.030 2.932 2 2 2.931-3.031 2.056 2.429v-6.411h-6.387z" />
    </svg>
  );
};

IconFullscreen.propTypes = {
  elementClass: PropTypes.string
};

export default IconFullscreen;
