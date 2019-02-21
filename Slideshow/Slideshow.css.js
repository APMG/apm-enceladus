import styled from 'styled-components';

export const SlideshowDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  margin: 10px 0;

  @media (max-width: 48em) {
    align-items: stretch;
    height: 100%;
  }
`

export const SlideshowButton = styled.div`
  height: 70px;
  width: 70px;
  margin-top: 25em;
  border: 0;
  border-radius: 100px;
  background: none;
  margin: 150px -35px 0;
  z-index: 3;
  background-color: #4a90e2;
  transition: background-color .175s;

  svg {
    padding: 17.5px;
  }

  &:hover, &:focus {
    background-color: #4a90e2;
  }
  
  @media (max-width: 48em) {
    display: none;
  }
`

export const SlideshowContainer = styled.div`
  overflow: hidden;
  display: grid;
  grid-column-start: 2;
  z-index: 0;
  max-width: 600px;
  margin-left: -40px;
`

export const SlideshowItem = styled.figure`
  grid-column-start: 1;
  grid-row-start: 1;
  z-index: 0;
  display: grid;
  grid-template-rows: auto auto;
`

export const SlideshowImage = styled.img`
  max-width: 600px;
  display: flex;

  img {
    object-fit: cover;
  }

  @media (max-width: 48em) {
    max-width: 600px;
  }
`

export const SlideshowCaption = styled.figcaption`
  background-color: #4a90e2;
  color: #ffffff;
  width: 100%;
  height: auto;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  font-weight: bold;
  line-height: 1.6;
`

export const SlideshowPose = styled.div`
  grid-row-start: 1;
  grid-column-start: 1;
`

export const Invisible = styled.span`
  display: none;
`
