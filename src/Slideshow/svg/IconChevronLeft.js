import React from 'react';
import PropTypes from 'prop-types';

const IconChevronLeft = (props) => (
  <svg
    className={`icon icon-chevronLeft ${props.elementClass &&
      props.elementClass}`}
    width="35"
    height="35"
    viewBox="0 0 35 35"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <path
        d="M48.2 47.4L30 47.4C28.9 47.4 28 46.5 28 45.4L28 44.3C28 43.2 28.9 42.3 30 42.3L46.2 42.3 46.2 26.1C46.2 25 47.1 24.1 48.2 24.1L49.4 24.1C50.5 24.1 51.4 25 51.4 26.1L51.4 45.4C51.4 46.5 50.5 47.4 49.4 47.4L48.2 47.4Z"
        fill="#FFFFFF"
        transform="translate(21, 18) rotate(135) translate(-39.7, -35.8)"
      />
    </g>
  </svg>
);

IconChevronLeft.propTypes = {
  elementClass: PropTypes.string
};

export default IconChevronLeft;
