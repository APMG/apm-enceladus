import React, { Component } from 'react';
import { Swipeable } from 'react-swipeable';
import PropTypes from 'prop-types';
import IconChevronRight from './svg/IconChevronRight';
import IconChevronLeft from './svg/IconChevronLeft';
import Poses from './Poses';
import { animationDuration } from './animations';
import { SlideshowDiv, SlideshowButton, SlideshowContainer, Invisible } from './Slideshow.css.js';

// Links will not work with react-swipeable. If you need to add links, we might have to consider removing the swiping capabilities. Should I try react-swipeable-views? react-easy-swipe?

class Slideshow extends Component {
  constructor(props) {
    super(props);

    let images = props.images;

    // Adds an index property to each image
    images.forEach((image, i) => {
      image.index = i;
    });

    this.state = {
      index: 0,
      images: images,
      disabled: false
    };
  }

  prevIndex(i) {
    return i > 0 ? i - 1 : this.state.images.length - 1;
  }

  nextIndex(i) {
    return i < this.state.images.length - 1 ? i + 1 : 0;
  }

  getNearestImages = (images, index) => {
    if (images.length < 3) {
      return images;
    } else {
      return [
        images[this.prevIndex(index)],
        images[index],
        images[this.nextIndex(index)]
      ];
    }
  };

  prev = () => {
    this.setState({
      index: this.prevIndex(this.state.index),
      disabled: true
    });

    setTimeout(() => {
      this.setState({ disabled: false });
    }, animationDuration);
  };

  next = () => {
    this.setState({
      index: this.nextIndex(this.state.index),
      disabled: true
    });

    setTimeout(() => {
      this.setState({ disabled: false });
    }, animationDuration);
  };

  render() {
    return (
      <SlideshowDiv className={`slideshow ${this.props.elementClass}`}>
        <SlideshowButton
          data-testid="prev-button"
          onClick={this.prev}
        >
          <IconChevronLeft />
          <Invisible>Previous Slide</Invisible>
        </SlideshowButton>

        <Swipeable
          onSwipingLeft={this.next}
          onSwipingRight={this.prev}
          delta={100}
          trackMouse={true}
          preventDefaultTouchmoveEvent={true}
          stopPropagation={true}
          disabled={this.state.disabled}
        >
          <SlideshowContainer data-testid="slideshow">
            {this.getNearestImages(this.state.images, this.state.index).map(
              (image) => (
                <Poses
                  key={image.index}
                  animation={this.props.animation}
                  image={image}
                  stateIndex={this.state.index}
                  max={this.state.images.length}
                />
              )
            )}
          </SlideshowContainer>
        </Swipeable>

        <SlideshowButton
          data-testid="next-button"
          onClick={this.next}
        >
          <IconChevronRight />
          <Invisible>Next Slide</Invisible>
        </SlideshowButton>
      </SlideshowDiv>
    );
  }
}

Slideshow.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      aspect_ratios: PropTypes.shape({
        normal: PropTypes.shape({
          instances: PropTypes.arrayOf(
            PropTypes.shape({
              width: PropTypes.number,
              url: PropTypes.string,
              height: PropTypes.number
            })
          ),
          slug: PropTypes.string
        }),
        square: PropTypes.shape({
          instances: PropTypes.arrayOf(
            PropTypes.shape({
              width: PropTypes.number,
              url: PropTypes.string,
              height: PropTypes.number
            })
          ),
          slug: PropTypes.string
        }),
        thumbnail: PropTypes.shape({
          instances: PropTypes.arrayOf(
            PropTypes.shape({
              width: PropTypes.number,
              url: PropTypes.string,
              height: PropTypes.number
            })
          ),
          slug: PropTypes.string
        }),
        widescreen: PropTypes.shape({
          instances: PropTypes.arrayOf(
            PropTypes.shape({
              width: PropTypes.number,
              url: PropTypes.string,
              height: PropTypes.number
            })
          ),
          slug: PropTypes.string
        }),
        portrait: PropTypes.shape({
          instances: PropTypes.arrayOf(
            PropTypes.shape({
              width: PropTypes.number,
              url: PropTypes.string,
              height: PropTypes.number
            })
          ),
          slug: PropTypes.string
        }),
        uncropped: PropTypes.shape({
          instances: PropTypes.arrayOf(
            PropTypes.shape({
              width: PropTypes.number,
              url: PropTypes.string,
              height: PropTypes.number
            })
          ),
          slug: PropTypes.string
        })
      }).isRequired,
      long_caption: PropTypes.string,
      short_caption: PropTypes.string,
      width: PropTypes.string,
      preferred_aspect_ratio_slug: PropTypes.string,
      id: PropTypes.string,
      credit_url: PropTypes.string,
      type: PropTypes.string,
      float: PropTypes.string,
      credit: PropTypes.string,
      url: PropTypes.string,
      srcset: PropTypes.string
    })
  ).isRequired,
  animation: PropTypes.object,
  elementClass: PropTypes.string
};
// The animation object is allowed to be "loose". It's just potentially too variable to test here, and if you mess it up, it shouldn't crash anything -- your animation just won't work.

Slideshow.defaultProps = {
  elementClass: ''
};

export default Slideshow;
