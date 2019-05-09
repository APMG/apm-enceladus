import React from 'react';
import PropTypes from 'prop-types';

const IconChevronRight = (props) => (
  <svg
    className={`icon icon-chevronRight ${props.elementClass &&
      props.elementClass}`}
    width="35"
    height="35"
    viewBox="0 0 35 35"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <path
        d="M39.2 47.4L21 47.4C19.9 47.4 19 46.5 19 45.4L19 44.3C19 43.2 19.9 42.3 21 42.3L37.2 42.3 37.2 26.1C37.2 25 38.1 24.1 39.2 24.1L40.4 24.1C41.5 24.1 42.4 25 42.4 26.1L42.4 45.4C42.4 46.5 41.5 47.4 40.4 47.4L39.2 47.4Z"
        fill="#FFFFFF"
        transform="translate(12, 18) rotate(-45) translate(-30.7, -35.8) "
      />
    </g>
  </svg>
);

IconChevronRight.propTypes = {
  elementClass: PropTypes.string
};

export default IconChevronRight;
