import React, { Component } from 'react';
import posed from 'react-pose';
import PropTypes from 'prop-types';
import { logic, fadeAnimation } from './animations';
import Slide from './Slide';
import { SlideshowPose } from './Slideshow.css.js'

class Poses extends Component {
  constructor(props) {
    super(props);

    // fadeAnimation is the default
    this.state = {
      animation: props.animation ? props.animation : fadeAnimation
    };

    this.animationWrapper = posed.div(this.state.animation.states);
  }

  render() {
    return (
      <SlideshowPose>
        <this.animationWrapper
          className={this.props.elementClass}
          key={this.props.image.index}
          pose={logic(
            this.state.animation.logic,
            this.props.stateIndex,
            this.props.image.index
          )}
        >
          <Slide image={this.props.image} max={this.props.max} />
        </this.animationWrapper>
      </SlideshowPose>
    );
  }
}

// TODO: outline shape of animation object in propTypes
Poses.propTypes = {
  animation: PropTypes.object,
  elementClass: PropTypes.string,
  stateIndex: PropTypes.number.isRequired,
  image: PropTypes.object.isRequired,
  max: PropTypes.number.isRequired
};

export default Poses;
