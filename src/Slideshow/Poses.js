import React, { Component } from 'react';
import posed from 'react-pose';
import PropTypes from 'prop-types';
import { logic, animations } from './animations';
import Slide from './Slide';

class Poses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animation: animations[props.animation]
    };

    this.animationWrapper = posed.div(this.state.animation.states);
  }

  render() {
    return (
      <this.animationWrapper
        className="slideshow_item"
        key={this.props.image.index}
        pose={logic(
          this.state.animation.logic,
          this.props.stateIndex,
          this.props.image.index
        )}
      >
        <Slide
          image={this.props.image}
          max={this.props.max}
          prev={this.props.prev}
          next={this.props.next}
        />
      </this.animationWrapper>
    );
  }
}

// TODO: outline shape of animation object in propTypes
Poses.propTypes = {
  animation: PropTypes.string,
  stateIndex: PropTypes.number.isRequired,
  image: PropTypes.object.isRequired,
  max: PropTypes.number.isRequired,
  prev: PropTypes.func,
  next: PropTypes.func
};

export default Poses;
