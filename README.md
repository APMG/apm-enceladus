# apm-enceladus

Takes an array of image objects from APM's Images API and turns it into a slideshow.

## Installation

Simply run the command `npm i apm-enceladus` or `yarn add apm-enceladus`.

## Usage

In files were you want to use the Image component, put `import { Slideshow } from 'apm-enceladus'` at the top of your file.

## Available Properties

* *images*: an array of JSON image objects returned from APM's Images API
* *animation*: Right now you can specify two types of transitions: 'fade' or 'slide'. If you'd like to add another, look at the `animations.js` file in this document and the [react-pose](https://popmotion.io/pose/) library
* *elementClass*: If you want to put a custom class name on the slideshow object, this is where you put it
