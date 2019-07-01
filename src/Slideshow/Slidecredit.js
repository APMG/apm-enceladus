import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const SlideCredit = (props) => {
  const { creditName, creditUrl } = props;
  {
    if (creditName && creditUrl)
      return (
        <Link href={creditUrl}>
          <a className="slideshow_creditlink">{creditName}</a>
        </Link>
      );
  }
  if (creditName) return <div>{creditName}</div>;
};

SlideCredit.propTypes = {
  creditName: PropTypes.string,
  creditUrl: PropTypes.string
};

export default SlideCredit;
