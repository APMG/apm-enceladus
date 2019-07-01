import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'apm-mimas';
import Slidecredit from './Slidecredit';

class Slide extends Component {
  render() {
    return (
      <figure className="slideshow_figure">
        <Image
          image={this.props.image}
          aspectRatio="widescreen"
          elementClass="slideshow_image"
        />
        <figcaption className="slideshow_caption">
          <div className="slideshow_credit">
            <Slidecredit
              creditName={this.props.image.credit.name}
              creditLink={this.props.image.credit.url}
            />
          </div>
          {this.props.image.long_caption}

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
  max: PropTypes.number.isRequired,
  credit: PropTypes.any
};

export default Slide;
