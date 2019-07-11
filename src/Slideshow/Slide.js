import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'apm-mimas';
import Slidecredit from './Slidecredit';
import IconChevronRight from './svg/IconChevronRight';
import IconChevronLeft from './svg/IconChevronLeft';

class Slide extends Component {
  render() {
    const { image, max, next, prev } = this.props;
    const { credit, long_caption } = image;
    const { name, url } = credit;
    return (
      <>
        <figure className="slideshow_figure">
          <button
            data-testid="prev-button"
            className="slideshow_button slideshow_button-prev"
            onClick={(e) => prev(e, this.prev)}
          >
            <IconChevronLeft elementClass="slideshow_icon" />
            <span className="invisible">Previous Slide</span>
          </button>
          <Image
            image={image}
            aspectRatio="widescreen"
            elementClass="slideshow_image"
          />

          <button
            data-testid="next-button"
            className="slideshow_button slideshow_button-next"
            onClick={(e) => next(e, this.next)}
          >
            <IconChevronRight elementClass="slideshow_icon" />
            <span className="invisible">Next Slide</span>
          </button>
          <figcaption className="slideshow_caption">
            {name && url && (
              <div className="slideshow_credit">
                <Slidecredit name={name} url={url} />
              </div>
            )}
            {long_caption}
            <br />
            <em>
              ({image.index + 1} of {max})
            </em>
          </figcaption>
        </figure>
      </>
    );
  }
}

Slide.propTypes = {
  image: PropTypes.shape({
    credit: PropTypes.shape({
      credit: PropTypes.string,
      name: PropTypes.string,
      url: PropTypes.string
    }),
    long_caption: PropTypes.string,
    index: PropTypes.number
  }),
  max: PropTypes.number.isRequired,
  prev: PropTypes.func,
  next: PropTypes.func
};

export default Slide;
