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

  componentDidMount() {
    this.fullscreenRef = React.createRef();
  }

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

  render() {
    const { activeTrap } = this.state;
    return (
      <>
        {activeTrap ? (
          <FocusTrap>
            <SlideshowInner
              isFullscreen={this.state.isFullscreen}
              images={this.props.images}
              fullscreen={this.fullscreen}
              isBgOnclickActive={this.isBgOnclickActive}
              isImageOnclickActive={this.isImageOnclickActive}
              fullscreenRef={this.fullscreenRef}
              slideshowBgRef={this.slideshowBgRef}
            />
          </FocusTrap>
        ) : (
          <SlideshowInner
            isFullscreen={this.state.isFullscreen}
            images={this.props.images}
            fullscreen={this.fullscreen}
            isBgOnclickActive={this.isBgOnclickActive}
            isImageOnclickActive={this.isImageOnclickActive}
            fullscreenRef={this.fullscreenRef}
            slideshowBgRef={this.slideshowBgRef}
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
