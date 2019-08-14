import React from 'react';
import { render, fireEvent, cleanup, wait } from 'react-testing-library';
import { images } from './fixtures/slideshow';
import Slideshow from './Slideshow';

afterEach(cleanup);

// SUCCESSES
test('Renders a div with the class slideshow when an images array prop is provided', () => {
  const { container } = render(<Slideshow images={images} />);

  expect(container.firstChild.classList).toContain('slideshow');
});

test('Renders a div with the class slideshow and a custom class when the slideshow and elementClass props are provided', () => {
  const props = {
    elementClass: 'test-slideshow'
  };
  const { container } = render(
    <Slideshow images={images} elementClass={props.elementClass} />
  );

  expect(container.firstChild.classList).toContain('slideshow');
  expect(container.firstChild.classList).toContain('test-slideshow');
});

test('Loads only three images (last, first and second) on launch', () => {
  const { container, getByAltText } = render(<Slideshow images={images} />);

  expect(container.querySelectorAll('.slideshow_image').length).toBe(3);
  expect(
    getByAltText('St. Vincent performs music from her album MassEducation')
      .length
  ).not.toBeNull();
  expect(
    getByAltText('Serena Brook opens our show at The Town Hall').length
  ).not.toBeNull();
  expect(
    getByAltText('Jon Batiste performs "Don\'t Stop"').length
  ).not.toBeNull();
});

test('Next button grabs the correct set of three images', async () => {
  const { getByAltText, getByTestId, container } = render(
    <Slideshow images={images} />
  );

  // Container has the following entries on load: stories.length - 1, 0 and 1
  let lastImage = getByAltText('Jon Batiste performs "Don\'t Stop"');
  let firstImage = getByAltText('Serena Brook opens our show at The Town Hall');
  let secondImage = getByAltText(
    'St. Vincent performs music from her album MassEducation'
  );

  expect(lastImage).not.toBeNull();
  expect(firstImage).not.toBeNull();
  expect(secondImage).not.toBeNull();
  expect(container).not.toContain('The LFH cast does some rapid fire comedy');
  expect(container.querySelectorAll('.slideshow_item').length).toBe(3);

  fireEvent.click(getByTestId('next-button'));

  // Container has the following entries after clicking next(): 0, 1, and 2
  await wait(() => {
    let thirdImage = getByAltText('The LFH cast does some rapid fire comedy');

    expect(firstImage).not.toBeNull();
    expect(secondImage).not.toBeNull();
    expect(thirdImage).not.toBeNull();
    expect(container).not.toContain('Jon Batiste performs "Don\'t Stop"');
    expect(container.querySelectorAll('.slideshow_item').length).toBe(3);
  });
});

test('Prev button works grabs the correct set of three images', async () => {
  const { getByAltText, getByTestId, container } = render(
    <Slideshow images={images} />
  );

  // Container has the following entries on load: -1, 0 and 1
  let lastImage = getByAltText('Jon Batiste performs "Don\'t Stop"');
  let firstImage = getByAltText('Serena Brook opens our show at The Town Hall');
  let secondImage = getByAltText(
    'St. Vincent performs music from her album MassEducation'
  );

  expect(lastImage).not.toBeNull();
  expect(firstImage).not.toBeNull();
  expect(secondImage).not.toBeNull();
  expect(container).not.toContain('Jim Gaffigan');
  expect(container.querySelectorAll('.slideshow_item').length).toBe(3);

  fireEvent.click(getByTestId('prev-button'));

  // Container has the following entries after clicking prev(): -2, -1, and 0
  await wait(() => {
    let secondToLastImage = getByAltText('Jim Gaffigan');

    expect(secondToLastImage).not.toBeNull();
    expect(lastImage).not.toBeNull();
    expect(firstImage).not.toBeNull();
    expect(container).not.toContain(
      'St. Vincent performs music from her album MassEducation'
    );
    expect(container.querySelectorAll('.slideshow_item').length).toBe(3);
  });
});

test('Animation set to fade by default', () => {
  const { container } = render(<Slideshow images={images} />);

  let slides = container.querySelectorAll('.slideshow_item');

  slides.forEach((slide, i) => {
    if (i === 1) {
      expect(slide.getAttribute('style')).toBe('opacity: 1;');
    } else {
      expect(slide.getAttribute('style')).toBe('opacity: 0;');
    }
  });
});

test('Slide animation is used when requested', () => {
  const { container } = render(<Slideshow images={images} animation="slide" />);

  let slides = container.querySelectorAll('.slideshow_item');

  slides.forEach((slide, i) => {
    if (i === 1) {
      expect(slide.getAttribute('style')).toBe('opacity: 1; transform: none;');
    } else {
      expect(slide.getAttribute('style')).toBe(
        'opacity: 0; transform: translateX(100px) translateZ(0);'
      );
    }
  });
});

test('Slideshow becomes fullscreen when fullscreen button clicked', () => {
  const { getByTestId, container } = render(<Slideshow images={images} />);
  const buttonFullScreenToggle = getByTestId('fullscreen-button');
  const slideshow = getByTestId('slideshow');
  const bodyElement = document.querySelector('body');
  expect(container.firstChild.classList.contains('fullscreen')).toBe(false);
  fireEvent.click(buttonFullScreenToggle);
  expect(container.firstChild.classList.contains('fullscreen')).toBe(true);
  expect(bodyElement.getAttribute('style')).toBe(
    'height: 100vh; overflow-y: hidden;'
  );
  expect(slideshow);
  fireEvent.click(buttonFullScreenToggle);
  expect(bodyElement.getAttribute('style')).toBe(
    'height: 100%; overflow-y: visible;'
  );
});

test('Slideshow shows correct button', () => {
  const { getByTestId, queryByText } = render(<Slideshow images={images} />);
  const buttonFullScreenToggle = getByTestId('fullscreen-button');

  expect(queryByText('Shrink Slide')).toBeNull();
  expect(queryByText('Fullscreen Slide')).not.toBeNull();
  fireEvent.click(buttonFullScreenToggle);
  expect(queryByText('Shrink Slide')).not.toBeNull();
  expect(queryByText('Fullscreen Slide')).toBeNull();
});

// FAILURES

test('Throws an error when the images prop is not provided', () => {
  expect(() => {
    render(<Slideshow />);
  }).toThrow();
});

test('Throws an error when the images prop is null', () => {
  expect(() => {
    render(<Slideshow images={null} />);
  }).toThrow();
});

test("Throws an error when the slides prop isn't formatted correctly", () => {
  const props = {
    images: [
      {
        src: 'https://www.fillmurray.com/200/300',
        alt: "It's a Phil Murray!"
      },
      {
        src: 'https://www.fillmurray.com/300/200',
        alt: "Don't you mean Bill Murray?"
      }
    ]
  };

  expect(() => {
    render(<Slideshow images={props.images} />);
  }).toThrow();
});
