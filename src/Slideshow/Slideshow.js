import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import IconChevronRight from './svg/IconChevronRight';
import IconChevronLeft from './svg/IconChevronLeft';
import IconFullscreen from './svg/IconFullscreen';
import Poses from './Poses';
import { animationDuration } from './animations';

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
      disabled: false,
      //add isZoom
      isZoom: false
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

  fullscreen = () => {
    /* eslint no-console:0 */
    console.log('in full screenmode', this.state.isZoom);
    this.setState({
      isZoom: !this.state.isZoom
    });
  };

  render() {
    const classes = classNames({
      slideshow: true,
      [this.props.elementClass]: this.props.elementClass
    });

    return (
      <div className={classes}>
        <button
          data-testid="fullscreen-button"
          className="slideshow_fullscreen"
          onClick={this.fullscreen}
        >
          <IconFullscreen elementClass="slideshow_icon slideshow_icon-fullscreen" />
          <span className="invisible">Fullscreen Slide</span>
        </button>
        <button
          data-testid="prev-button"
          className="slideshow_button slideshow_button-prev"
          onClick={this.prev}
        >
          <IconChevronLeft elementClass="slideshow_icon" />
          <span className="invisible">Previous Slide</span>
        </button>

        <div className="slideshow_container">
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
        </div>

        <button
          data-testid="next-button"
          className="slideshow_button slideshow_button-next"
          onClick={this.next}
        >
          <IconChevronRight elementClass="slideshow_icon" />
          <span className="invisible">Next Slide</span>
        </button>
      </div>
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
  animation: PropTypes.oneOf(['fade', 'slide']),
  elementClass: PropTypes.string
};
// The animation object is allowed to be "loose". It's just potentially too variable to test here, and if you mess it up, it shouldn't crash anything -- your animation just won't work.

Slideshow.defaultProps = {
  animation: 'fade'
};

export default Slideshow;
