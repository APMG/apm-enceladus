import React from 'react';
// import { render, fireEvent, cleanup, wait } from 'react-testing-library';
import { images } from './data/slideshow';
import Slideshow from '../Slideshow';
import { render, cleanup } from 'react-testing-library';
// import { animations } from '../animations';

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

// TODO: test that next button works

// TODO: test that prev button works

// TODO: test that the 'fade' animation can be rendered

// TODO: test that the 'slide' animation can also be rendered

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
