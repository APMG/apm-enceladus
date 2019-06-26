import React from 'react';
import Slideshow from './Slideshow';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { withReadme } from 'storybook-readme';
import readme from './README.md';
import { images } from './fixtures/slideshow';

const stories = storiesOf('Atoms/Figure', module);

const options = {
  slide: 'slide',
  fade: 'fade'
};

stories.addDecorator(withKnobs()).addDecorator(withReadme([readme]));

stories.add('Basic Slideshow', () => {
  return <Slideshow images={images} />;
});

stories.add('w/ Slide Animation', () => {
  return (
    <Slideshow
      images={images}
      animation={select('Animation', options, 'slide')}
    />
  );
});
