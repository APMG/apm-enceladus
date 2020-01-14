import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from '@apmg/mimas';
import SlideCredit from './Slidecredit';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

class Slide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 0,
      slideWidth: '100%'
    };
  }

  getFigureHeight = (size) => {
    this.setState({ size: size });
  };

  refSlideCallback = (element) => {
    if (element) {
      var intFrameHeight = window.innerHeight;
      var captionHeight;

      if (element.offsetHeight >= 100) {
        //mobile will be taller than 100
        captionHeight = element.offsetHeight;
      } else {
        //desktop will usually be less than 100
        // keep height consistent between long captions and short captions
        captionHeight = 100;
      }

      if (captionHeight === undefined || 0) {
        return;
      }
      let imgHeight = intFrameHeight - 100;
      this.getFigureHeight(imgHeight);
    }
  };

  render() {
    const { size } = this.state;
    let dynamicStyle = () => css`
      > img {
        max-height: ${size}px;
        width: auto;
      }
    `;
    let ManageFullScreenHeight = styled('div')`
      ${dynamicStyle}
    `;

    return (
      <div className="slideshow_slide">
        <div className="slideshow_count">
          {this.props.image.index + 1} of {this.props.max}
        </div>
        <figure className="slideshow_figure">
          <ManageFullScreenHeight>
            <Image
              image={this.props.image}
              aspectRatio={
                this.props.image.aspect_ratios.preferred_aspect_ratio_slug
              }
              elementClass="slideshow_image"
            />
          </ManageFullScreenHeight>

          <figcaption className="slideshow_caption" ref={this.refSlideCallback}>
            {this.props.image.long_caption}
            {this.props.image.credit && (
              <div className="slideshow_credit">
                <SlideCredit
                  name={this.props.image.credit}
                  url={this.props.image.credit_url}
                />
              </div>
            )}
          </figcaption>
        </figure>
      </div>
    );
  }
}

Slide.propTypes = {
  image: PropTypes.object,
  max: PropTypes.number.isRequired,
  prev: PropTypes.func,
  next: PropTypes.func,
  refSlideCallback: PropTypes.func,
  getSlideshowSize: PropTypes.func,
  size: PropTypes.number
};

export default Slide;
