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
        key={this.props.image.index}
        pose={logic(
          this.state.animation.logic,
          this.props.stateIndex,
          this.props.image.index
        )}
      >
        <Slide image={this.props.image} max={this.props.max} />
      </this.animationWrapper>
    );
  }
}

// TODO: outline shape of animation object in propTypes
Poses.propTypes = {
  animation: PropTypes.string,
  stateIndex: PropTypes.number.isRequired,
  image: PropTypes.object.isRequired,
  max: PropTypes.number.isRequired
};

export default Poses;
