import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import IconChevronRight from './svg/IconChevronRight';
import IconChevronLeft from './svg/IconChevronLeft';
import IconFullscreen from './svg/IconFullscreen';
import IconShrink from './svg/IconShrink';
import Poses from './Poses';
import { animationDuration } from './animations';
import FocusTrap from 'focus-trap-react';

// Links will not work with react-swipeable. If you need to add links, we might have to consider removing the swiping capabilities. Should I try react-swipeable-views? react-easy-swipe?

class Slideshow extends Component {
  constructor(props) {
    super(props);
    this.fullscreenRef = React.createRef();
    this.slideshowRef = React.createRef();
    let images = props.images;

    // Adds an index property to each image
    images.forEach((image, i) => {
      image.index = i;
    });

    this.state = {
      index: 0,
      images: images,
      disabled: false,
      isZoom: false,
      activeTrap: false
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
    const body = document.body;
    const slideshowElement = this.slideshowRef.current;
    if (!this.state.isZoom) {
      if (slideshowElement) {
        slideshowElement.current.focus();
      }
      body.style.height = '100vh';
      body.style.overflowY = 'hidden';
    }
    if (this.state.isZoom) {
      body.style.height = '100%';
      body.style.overflowY = 'visible';
    }
    this.setState({
      isZoom: !this.state.isZoom,
      activeTrap: !this.state.activeTrap
    });
  };

  render() {
    const classes = classNames({
      slideshow: true,
      [this.props.elementClass]: this.props.elementClass
    });

    return (
      <FocusTrap>
        <div
          id="slideshow"
          data-testid="slideshow"
          className={`${this.state.isZoom ? classes + ' fullscreen' : classes}`}
          ref={this.slideshowRef}
        >
          <button
            aria-haspopup="true"
            aria-label="fullscreen slideshow"
            data-testid="fullscreen-button"
            className="slideshow_fullscreen"
            onClick={this.fullscreen}
            ref={this.fullscreenRef}
          >
            {!this.state.isZoom && (
              <>
                <IconFullscreen elementClass="slideshow_icon slideshow_icon-fullscreen" />
                <span className="invisible" data-testid="icon-fullscreen">
                  Fullscreen Slide
                </span>
              </>
            )}
            {this.state.isZoom && (
              <>
                <IconShrink
                  elementClass="slideshow_icon slideshow_icon-shrink"
                  aria-label="close"
                />
                <span className="invisible" data-testid="icon-shrink">
                  Shrink Slide
                </span>
              </>
            )}
          </button>
          <button
            data-testid="prev-button"
            aria-label="Icon Chevron Left"
            className="slideshow_button slideshow_button-prev"
            onClick={this.prev}
          >
            <IconChevronLeft elementClass="slideshow_icon" />
            <span className="invisible">Previous Slide</span>
          </button>
          <>
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <div
              className={`${
                this.state.isZoom
                  ? 'slideshow_container fullscreen'
                  : 'slideshow_container'
              }`}
              aria-modal={this.state.isZoom}
              aria-haspopup="true"
              role="dialog"
              onClick={this.fullscreen}
              onKeyUp={this.wrapKeyHandler}
            >
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
          </>
          <button
            data-testid="next-button"
            aria-label="Icon Chevron Right"
            className="slideshow_button slideshow_button-next"
            onClick={this.next}
          >
            <IconChevronRight elementClass="slideshow_icon" />
            <span className="invisible">Next Slide</span>
          </button>
        </div>
      </FocusTrap>
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
