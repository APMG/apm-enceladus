import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'apm-mimas';

class Slide extends Component {
  render() {
    return (
      <figure>
        <Image
          image={this.props.image}
          aspectRatio="widescreen"
          elementClass="slideshow_image"
        />
        <figcaption className="slideshow_caption">
          {this.props.image.short_caption}
          <br />
          <em>
            ({this.props.image.index + 1} of {this.props.max})
          </em>
        </figcaption>
      </figure>
    );
  }
}

Slide.propTypes = {
  image: PropTypes.object,
  max: PropTypes.number.isRequired
};

export default Slide;
