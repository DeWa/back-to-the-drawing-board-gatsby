import React from 'react';
import { Global, css } from '@emotion/core';
import dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';

import media from './src/helpers/media';

// PrismJS theme
require('prismjs/themes/prism-tomorrow.css');
require('prismjs/plugins/command-line/prism-command-line.css');

dayjs.extend(relativeTime);

const globalStyle = css`
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -ms-box-sizing: border-box;
  }

  /* FONTS */
  @font-face {
    font-family: 'PermanentMarker';
    font-display: swap;
    font-style: normal;
    font-weight: 400;
    src: local('PermanentMarker'),
      url('/fonts/PermanentMarker-Regular.woff2') format('woff2'),
      url('/fonts/PermanentMarker-Regular.woff') format('woff'),
      url('/fonts/PermanentMarker-Regular.ttf') format('truetype'),
      url('/fonts/PermanentMarker-Regular.eot') format('embedded-opentype');
  }
  @font-face {
    font-family: 'Lato';
    font-display: swap;
    font-style: italic;
    font-weight: 400;
    src: local('Lato'), url('/fonts/Lato-Italic.woff2') format('woff2'),
      url('/fonts/Lato-Italic.woff') format('woff'),
      url('/fonts/Lato-Italic.ttf') format('truetype'),
      url('/fonts/Lato-Italic.eot') format('embedded-opentype');
  }
  @font-face {
    font-family: 'Lato';
    font-display: swap;
    font-style: normal;
    font-weight: 700;
    src: local('Lato'), url('/fonts/Lato-Bold.woff2') format('woff2'),
      url('/fonts/Lato-Bold.woff') format('woff'),
      url('/fonts/Lato-Bold.ttf') format('truetype'),
      url('/fonts/Lato-Bold.eot') format('embedded-opentype');
  }
  @font-face {
    font-family: 'Lato';
    font-display: swap;
    font-style: normal;
    font-weight: 400;
    src: local('Lato'), url('/fonts/Lato-Regular.woff2') format('woff2'),
      url('/fonts/Lato-Regular.woff') format('woff'),
      url('/fonts/Lato-Regular.ttf') format('truetype'),
      url('/fonts/Lato-Regular.eot') format('embedded-opentype');
  }
  @font-face {
    font-family: 'Arvo';
    font-display: swap;
    font-style: italic;
    font-weight: 400;
    src: local('Arvo'), url('/fonts/Arvo-Italic.woff2') format('woff2'),
      url('/fonts/Arvo-Italic.woff') format('woff'),
      url('/fonts/Arvo-Italic.ttf') format('truetype'),
      url('/fonts/Arvo-Italic.eot') format('embedded-opentype');
  }
  @font-face {
    font-family: 'Arvo';
    font-display: swap;
    font-style: normal;
    font-weight: 700;
    src: local('Arvo'), url('/fonts/Arvo-Bold.woff2') format('woff2'),
      url('/fonts/Arvo-Bold.woff') format('woff'),
      url('/fonts/Arvo-Bold.ttf') format('truetype'),
      url('/fonts/Arvo-Bold.eot') format('embedded-opentype');
  }
  @font-face {
    font-family: 'Arvo';
    font-display: swap;
    font-style: normal;
    font-weight: 400;
    src: local('Arvo'), url('/fonts/Arvo-Regular.woff2') format('woff2'),
      url('/fonts/Arvo-Regular.woff') format('woff'),
      url('/fonts/Arvo-Regular.ttf') format('truetype'),
      url('/fonts/Arvo-Regular.eot') format('embedded-opentype');
  }
  /* Text-sizes */
  h1 {
    font-size: 2rem;
  }
  h2 {
    font-size: 1.75rem;
  }
  h3 {
    font-size: 1.5rem;
  }
  h4 {
    font-size: 1rem;
  }

  html {
    height: 100%;
  }

  body {
    min-height: 100%;
    -webkit-font-smoothing: antialiased;
  }

  html {
    font-size: 16px;

    ${media['uhd']} {
      font-size: 20px;
    }
  }

  body {
    font-family: 'Lato', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Arvo', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';
  }

  em {
    font-style: italic;
  }

  strong {
    font-weight: bold;
  }

  .gatsby-highlight {
    margin-block-end: 1em;
  }
`;

const wrapRootElement = ({ element }) => {
  return (
    <React.Fragment>
      <Global styles={globalStyle} />
      {element}
    </React.Fragment>
  );
};

export { wrapRootElement };
// exports.onClientEntry = () => {
//   // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
//   if (!(`IntersectionObserver` in window)) {
//     import(`intersection-observer`);
//     console.log(`# IntersectionObserver is polyfilled!`);
//   }
// };
