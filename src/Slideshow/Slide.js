import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Image } from 'apm-react-image'; Wrapping in styles won't work here, in spite of what the docs say
import './Slideshow.css';
import { SlideshowImage, SlideshowItem, SlideshowCaption } from './Slideshow.css.js'

class Slide extends Component {
  render() {
    return (
      <SlideshowItem className="slideshow_item">
        <SlideshowImage
          src={this.props.image.url}
          srcset={this.props.image.srcSet}
          alt={this.props.image.short_caption}
        />
        <SlideshowCaption>
          {this.props.image.short_caption}
          <br />
          <em>
            ({this.props.image.index + 1} of {this.props.max})
          </em>
        </SlideshowCaption>
      </SlideshowItem>
    );
  }
}

Slide.propTypes = {
  image: PropTypes.object,
  max: PropTypes.number.isRequired
};

export default Slide;
