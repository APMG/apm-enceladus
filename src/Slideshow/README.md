
# Image

A component for displaying a slideshow of images from APM's Image API.

## Properties

### images

An array of JSON endpoints from APM's Image API. If formatted as expected, this component will create the src, srcset, sizes, alt text for each one and lay out the first three as needed.

### animation

Accepts one of two strings which describe one of the two animations we have built:

* "fade"
* "slide"

### elementClass

Accepts a string and becomes another className on the slideshow object.
