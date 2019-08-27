import React, { Component } from 'react';
import FocusTrap from 'focus-trap-react';
import PropTypes from 'prop-types';
import SlideshowInner from './SlideshowInner';

// Links will not work with react-swipeable. If you need to add links, we might have to consider removing the swiping capabilities. Should I try react-swipeable-views? react-easy-swipe?

class Slideshow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFullscreen: false,
      activeTrap: false
    };
  }

  render() {
    const { activeTrap } = this.state;
    return (
      <>
        {activeTrap ? (
          <FocusTrap>
            <SlideshowInner
              isFullscreen={this.state.isFullscreen}
              images={this.props.images}
            />
          </FocusTrap>
        ) : (
          <SlideshowInner
            isFullscreen={this.state.isFullscreen}
            images={this.props.images}
          />
        )}
      </>
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
  ).isRequired
};
export default Slideshow;
