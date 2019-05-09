# apm-mimas

Takes an endpoint from APM's Images API and turns it into an &lt;img /> object with srcset.

## Installation

Simply run the command `npm i apm-mimas` or `yarn add apm-mimas`.

## Usage

In files were you want to use the Image component, put `import { Image } from 'apm-mimas'` at the top of your file.

## Available Properties

* *image*: a JSON image object returned from APM's Images API
* *aspectRatio*: used to specify which size of image you'd like returned from the API. Useless for other types of images
* *alt*: set the image's `alt` attribute. Will override the automatic value of image.short_caption if applicable
* *elementClass*: provide a custom `className` to this object, for use in styling, custom JavaScript, and so on
* *fallbackSrcSet*: provide an alternative `srcset` attribute if you're not using the Images API
* *fallbackSrc*: provide an alternative `src` attribute if you're not using the Images API.
* *sizes*: provide guildelines for what the image size should be depending on various media queries
