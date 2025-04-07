import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import IconChevronRight from './svg/IconChevronRight';
import IconChevronLeft from './svg/IconChevronLeft';
import IconFullscreen from './svg/IconFullscreen';
import IconClose from './svg/IconClose';
import Poses from './Poses';
import { animationDuration } from './animations';

const SlideshowInner = ({
  images: initialImages,
  isFullscreen,
  fullscreen,
  fullscreenRef,
  isBgOnclickActive,
  isImageOnclickActive,
  animation,
  elementClass,
  mobileAr,
  media
}) => {
  const [index, setIndex] = useState(0);
  const slideshowBgRef = useRef(null);
  const images = initialImages.map((image, i) => ({ ...image, index: i }));

  const prevIndex = (i) => (i > 0 ? i - 1 : images.length - 1);
  const nextIndex = (i) => (i < images.length - 1 ? i + 1 : 0);

  const getNearestImages = (index) => {
    return images.length < 3
      ? images
      : [images[prevIndex(index)], images[index], images[nextIndex(index)]];
  };

  const prev = useCallback(() => {
    setIndex(prevIndex(index));
    setTimeout(() => animationDuration);
  }, [index]);

  const next = useCallback(() => {
    setIndex(nextIndex(index));
    setTimeout(() => animationDuration);
  }, [index]);

  const wrapKeyHandler = useCallback(
    (event) => {
      if (event.keyCode === 39) next();
      if (event.keyCode === 37) prev();
      if (event.keyCode === 27 && isFullscreen) {
        fullscreen();
        fullscreenRef.current?.focus();
      }
    },
    [next, prev, isFullscreen, fullscreen, fullscreenRef]
  );

  const classes = classNames('slideshow', { [elementClass]: elementClass });

  return (
    <div
      id="slideshow"
      data-testid="slideshow"
      className={`${isFullscreen ? classes + ' fullscreen' : classes}`}
    >
      <button
        aria-haspopup={!isFullscreen ? 'dialog' : false}
        data-testid="fullscreen-button"
        className="slideshow_fullscreen"
        onClick={fullscreen}
        ref={fullscreenRef}
        onKeyUp={wrapKeyHandler}
      >
        {!isFullscreen && (
          <>
            <IconFullscreen elementClass="slideshow_icon slideshow_icon-fullscreen" />
            <span className="invisible" data-testid="icon-fullscreen">
              Fullscreen Slideshow
            </span>
          </>
        )}
        {isFullscreen && (
          <>
            <IconClose
              elementClass="slideshow_icon slideshow_icon-shrink"
              aria-label="close"
            />
            <span className="invisible" data-testid="icon-shrink">
              Exit Fullscreen Slideshow
            </span>
          </>
        )}
      </button>
      <button
        data-testid="prev-button"
        aria-label="Icon Chevron Left"
        className="slideshow_button slideshow_button-prev"
        onClick={prev}
        onKeyUp={wrapKeyHandler}
      >
        <IconChevronLeft elementClass="slideshow_icon" />
        <span className="invisible">Previous Slide</span>
      </button>
      <>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <div
          className={`${
            isFullscreen
              ? 'slideshow_container fullscreen'
              : 'slideshow_container'
          }`}
          aria-modal={isFullscreen}
          aria-label="Slideshow container"
          role={isFullscreen ? 'dialog' : false}
          onClick={isImageOnclickActive}
          onKeyUp={wrapKeyHandler}
        >
          {getNearestImages(images, index).map((image) => (
            <Poses
              key={image.index}
              animation={animation}
              image={image}
              stateIndex={index}
              max={images.length}
              mobileAr={mobileAr}
              media={media}
            />
          ))}
        </div>
      </>

      <button
        data-testid="next-button"
        aria-label="Icon Chevron Right"
        className="slideshow_button slideshow_button-next"
        onClick={next}
        onKeyUp={wrapKeyHandler}
      >
        <IconChevronRight elementClass="slideshow_icon" />
        <span className="invisible">Next Slide</span>
      </button>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <div
        id="slideshowBg"
        onClick={isBgOnclickActive}
        onKeyUp={wrapKeyHandler}
        role="figure"
        data-testid="slideshowBg"
        className={`${
          isFullscreen ? 'slideshow_bg fullscreen' : 'slideshow_bg'
        }`}
        ref={slideshowBgRef}
      />
    </div>
  );
};

SlideshowInner.propTypes = {
  fullscreenRef: PropTypes.object,
  isFullscreen: PropTypes.bool,
  fullscreen: PropTypes.func,
  isBgOnclickActive: PropTypes.func,
  wrapKeyHandler: PropTypes.func,
  isImageOnclickActive: PropTypes.func,
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
  elementClass: PropTypes.string,
  mobileAr: PropTypes.oneOf([
    'normal',
    'uncropped',
    'square',
    'widescreen',
    'portrait',
    'thumbnail'
  ]),
  media: PropTypes.arrayOf(PropTypes.string)
};
// The animation object is allowed to be "loose". It's just potentially too variable to test here, and if you mess it up, it shouldn't crash anything -- your animation just won't work.

SlideshowInner.defaultProps = {
  animation: 'fade'
};

export default SlideshowInner;
