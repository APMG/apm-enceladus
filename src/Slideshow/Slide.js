import React from 'react';
import PropTypes from 'prop-types';
import { Image } from '@apmg/mimas';
import SlideCredit from './SlideCredit';

const Slide = (props) => {
  return (
    <>
      <div className="slideshow_count">
        {props.image.index + 1} of {props.max}
      </div>
      <figure className="slideshow_figure">
        <Image
          image={props.image}
          aspectRatio="widescreen"
          elementClass="slideshow_image"
        />

        <figcaption className="slideshow_caption">
          {props.image.credit && (
            <div className="slideshow_credit">
              <SlideCredit
                name={props.image.credit}
                url={props.image.credit_url}
              />
            </div>
          )}
          {props.image.long_caption}
        </figcaption>
      </figure>
    </>
  );
};

Slide.propTypes = {
  image: PropTypes.object,
  max: PropTypes.number.isRequired,
  prev: PropTypes.func,
  next: PropTypes.func
};

export default Slide;
