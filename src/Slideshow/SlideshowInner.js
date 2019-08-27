import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import IconChevronRight from './svg/IconChevronRight';
import IconChevronLeft from './svg/IconChevronLeft';
import IconFullscreen from './svg/IconFullscreen';
import IconClose from './svg/IconClose';
import Poses from './Poses';
import { animationDuration } from './animations';

class SlideshowInner extends Component {
  constructor(props) {
    super(props);
    this.fullscreenRef = React.createRef();
    this.slideshowBgRef = React.createRef();
    let images = props.images;

    // Adds an index property to each image
    images.forEach((image, i) => {
      image.index = i;
    });

    this.state = {
      index: 0,
      images: images,
      disabled: false,
      isFullscreen: false
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
    if (!this.state.isFullscreen) {
      if (this.fullscreenRef.current) {
        this.fullscreenRef.current.focus();
      }
      body.style.height = '100vh';
      body.style.overflowY = 'hidden';
    }
    if (this.state.isFullscreen) {
      body.style.height = 'auto';
      body.style.overflowY = 'visible';
    }
    this.setState({
      isFullscreen: !this.state.isFullscreen,
      activeTrap: !this.state.activeTrap
    });
  };

  isImageOnclickActive = () => {
    //if the state is fullscreen disable onclick
    if (!this.state.isFullscreen) {
      this.fullscreen();
    }
    //if the state is fullscreen disable onclick
    if (this.state.isFullscreen) {
      return;
    }
  };

  isBgOnclickActive = () => {
    //if the state is fullscreen disable onclick
    if (this.state.isFullscreen) {
      this.fullscreen();
    }
    //if the state is fullscreen disable onclick
    if (!this.state.isFullscreen) {
      return;
    }
  };

  wrapKeyHandler = (event) => {
    if (event.keyCode === 27 && this.state.isFullscreen) {
      // escape key
      this.fullscreen();
      this.fullscreenRef.current.focus();
    }
  };
  render() {
    const classes = classNames({
      slideshow: true,
      [this.props.elementClass]: this.props.elementClass
    });
    return (
      <div
        id="slideshow"
        data-testid="slideshow"
        className={`${
          this.state.isFullscreen ? classes + ' fullscreen' : classes
        }`}
      >
        <button
          aria-haspopup="true"
          aria-label="fullscreen slideshow"
          data-testid="fullscreen-button"
          className="slideshow_fullscreen"
          onClick={this.fullscreen}
          ref={this.fullscreenRef}
          onKeyUp={this.wrapKeyHandler}
        >
          {!this.state.isFullscreen && (
            <>
              <IconFullscreen elementClass="slideshow_icon slideshow_icon-fullscreen" />
              <span className="invisible" data-testid="icon-fullscreen">
                Fullscreen Slide
              </span>
            </>
          )}
          {this.state.isFullscreen && (
            <>
              <IconClose
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
              this.state.isFullscreen
                ? 'slideshow_container fullscreen'
                : 'slideshow_container'
            }`}
            aria-modal={this.state.isFullscreen}
            aria-haspopup="true"
            role="dialog"
            onClick={this.isImageOnclickActive}
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
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <div
          id="slideshowBg"
          onClick={this.isBgOnclickActive}
          onKeyUp={this.wrapKeyHandler}
          role="figure"
          data-testid="slideshowBg"
          className={`${
            this.state.isFullscreen ? 'slideshow_bg fullscreen' : 'slideshow_bg'
          }`}
          ref={this.slideshowBgRef}
        />
      </div>
    );
  }
}

SlideshowInner.propTypes = {
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

SlideshowInner.defaultProps = {
  animation: 'fade'
};

export default SlideshowInner;
