import React from 'react';
import { render, fireEvent, cleanup, wait, prettyDOM } from 'react-testing-library';
import { images } from './data/slideshow';
import Slideshow from '../Slideshow';
import { slideAnimation } from '../animations';
import 'jest-prop-type-error';

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

describe('Renders the correct number of slides (max 3)', () => {
  it('max three', () => {
    const { container } = render(<Slideshow images={images} />);
    expect(container.querySelectorAll('.slideshow_item').length).toBe(3);
  });

  it('only one', () => {
    const oneImage = images.slice(0, 1);
    const { container } = render(<Slideshow images={oneImage} />);
    expect(container.querySelectorAll('.slideshow_item').length).toBe(1);
  });
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

test('Prev button works grabs the right set of three images', async () => {
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

describe('Loads the correct animation', () => {
  it('loads fade by default', () => {
    const { getByTestId } = render(<Slideshow images={images} />);

    getByTestId('slideshow').childNodes.forEach((node, i) => {
      if (i === 1) {
        expect(node.firstChild.getAttribute('style')).toBe('opacity: 1;');
      } else {
        expect(node.firstChild.getAttribute('style')).toBe('opacity: 0;');
      }
    });
  });

  it('loads slide when requested', () => {
    const { getByTestId } = render(
      <Slideshow images={images} animation={slideAnimation} />
    );

    getByTestId('slideshow').childNodes.forEach((node, i) => {
      if (i === 1) {
        expect(node.firstChild.getAttribute('style')).toBe('opacity: 1; transform: none;');
      } else {
        expect(node.firstChild.getAttribute('style')).toBe(
          'opacity: 0; transform: translateX(100px) translateZ(0);'
        );
      }
    });
  });
});

// // FAILURES

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
