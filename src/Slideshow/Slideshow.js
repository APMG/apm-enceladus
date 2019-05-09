import React, { Component } from 'react';
import { Swipeable } from 'react-swipeable';
import PropTypes from 'prop-types';
import IconChevronRight from './svg/IconChevronRight';
import IconChevronLeft from './svg/IconChevronLeft';
import Poses from './Poses';
import { animationDuration } from './animations';
import './styles.css';

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
      <div className={`slideshow ${this.props.elementClass}`}>
        <button
          data-testid="prev-button"
          className="slideshow_button"
          onClick={this.prev}
        >
          <IconChevronLeft />
          <span className="invisible">Previous Slide</span>
        </button>

        <Swipeable
          onSwipingLeft={this.next}
          onSwipingRight={this.prev}
          delta={100}
          trackMouse={true}
          preventDefaultTouchmoveEvent={true}
          stopPropagation={true}
          disabled={this.state.disabled}
        >
          <div data-testid="slideshow" className="slideshow_container">
            {this.getNearestImages(this.state.images, this.state.index).map(
              (image) => (
                <Poses
                  key={image.index}
                  animation={this.props.animation}
                  elementClass="slideshow_item"
                  image={image}
                  stateIndex={this.state.index}
                  max={this.state.images.length}
                />
              )
            )}
          </div>
        </Swipeable>

        <button
          data-testid="next-button"
          className="slideshow_button"
          onClick={this.next}
        >
          <IconChevronRight />
          <span className="invisible">Next Slide</span>
        </button>
      </div>
    );
  }
}

Slideshow.propTypes = {
  images: PropTypes.array.isRequired,
  animation: PropTypes.object,
  elementClass: PropTypes.string
};
// The animation object is allowed to be "loose". It's just potentially too variable to test here, and if you mess it up, it shouldn't crash anything -- your animation just won't work.

Slideshow.defaultProps = {
  elementClass: ''
};

export default Slideshow;
