import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const SlideCredit = (props) => {
  const { name, url } = props;

  if (url) {
    return (
      <div className={url}>
        <Link href={url}>
          <a className="slideshow_creditlink">{name}</a>
        </Link>
      </div>
    );
  }
  if (name) return <div className="creditOnly">{name}</div>;
};

SlideCredit.propTypes = {
  creditName: PropTypes.string,
  creditUrl: PropTypes.string
};

export default SlideCredit;
