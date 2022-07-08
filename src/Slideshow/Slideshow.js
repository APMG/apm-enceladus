import React, { Component } from 'react';
import FocusTrap from 'focus-trap-react';
import PropTypes from 'prop-types';
import SlideshowInner from './SlideshowInner';
import Head from 'next/head';

// Links will not work with react-swipeable. If you need to add links, we might have to consider removing the swiping capabilities. Should I try react-swipeable-views? react-easy-swipe?

class Slideshow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFullscreen: false,
      activeTrap: false,
      isAmp: props.isAmp ? props.isAmp : false
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
    const { activeTrap, isAmp } = this.state;
    if (isAmp) {
      const aspectRatio =
        this.props.images[0].preferred_aspect_ratio_slug || 'normal';
      return (
        <>
          <Head>
            <script
              async
              custom-element="amp-carousel"
              src="https://cdn.ampproject.org/v0/amp-carousel-0.2.js"
            />
          </Head>
          <amp-carousel
            width={
              this.props.images[0].aspect_ratios[aspectRatio].instances[0].width
            }
            height={
              this.props.images[0].aspect_ratios[aspectRatio].instances[0]
                .height
            }
            layout="responsive"
            type="slides"
          >
            {this.props.images.map((image) => {
              const imageRatio = image.aspect_ratios[aspectRatio]
                ? aspectRatio
                : image.preferred_aspect_ratio_slug || 'normal';
              const instance = image.aspect_ratios[imageRatio].instances.sort(
                (a, b) => (a.width > b.width ? 1 : -1)
              )[0];

              return (
                <amp-img
                  key={instance.url}
                  src={instance.url}
                  width={instance.width}
                  height={instance.height}
                />
              );
            })}
          </amp-carousel>
        </>
      );
    }
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
              mobileAr={this.props.mobileAr}
              media={this.props.media}
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
            mobileAr={this.props.mobileAr}
            media={this.props.media}
          />
        )}
      </>
    );
  }
}

Slideshow.propTypes = {
  isAmp: PropTypes.bool,
  mobileAr: PropTypes.oneOf([
    'normal',
    'uncropped',
    'square',
    'widescreen',
    'portrait',
    'thumbnail'
  ]),
  media: PropTypes.arrayOf(PropTypes.string),
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
