import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Slideshow from './Slideshow.js';
import { images } from './test/data/slideshow';
import { withReadme } from 'storybook-readme';
import readme from './README.md';
import { slideAnimation } from './animations.js';

const stories = storiesOf('Slideshow', module);
stories.addDecorator(withKnobs).addDecorator(withReadme([readme]));

stories.add('Slideshow default', () => {
  return <Slideshow images={images} />;
});

stories.add('Slideshow with custom animation', () => {
  return <Slideshow images={images} animation={slideAnimation} />;
});
