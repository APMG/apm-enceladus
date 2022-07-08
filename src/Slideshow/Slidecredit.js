import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const SlideCredit = (props) => {
  const { name, url } = props;
  if (url && name) {
    return (
      <>
        <Link href={url} as={url}>
          <a className="slideshow_creditLink">{name}</a>
        </Link>
      </>
    );
  }
  if (name && !url) return <div className="slideshow_creditName">{name}</div>;
};

SlideCredit.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string
};

export default SlideCredit;
