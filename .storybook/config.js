import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import { withOptions } from '@storybook/addon-options';
import { withInfo } from '@storybook/addon-info';

import './index.css';

//load all stories within stories folder
const req = require.context('../src', true, /(\.|\/)story\.js$/);

function loadStories() {
  require('./index.js');
  req.keys().forEach((filename) => req(filename));
}

addDecorator(
  withInfo({
    inline: true,
    header: false,
    source: true,
    maxPropsIntoLine: 1
  })
);

addDecorator(
  withOptions({
    goFullScreen: false,
    showStoriesPanel: true,
    showAddonPanel: true,
    showSearchBox: false,
    addonPanelInRight: true,
    sortStoriesByKind: true
  })
);

configure(loadStories, module);
