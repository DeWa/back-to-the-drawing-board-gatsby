const React = require('react');
const globalStyle = require('./src/style/global.css');

exports.wrapRootElement = ({ element }) => {
  return (
    <React.Fragment>
      <div className={globalStyle} />
      {element}
    </React.Fragment>
  );
};

// exports.onClientEntry = () => {
//   // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
//   if (!(`IntersectionObserver` in window)) {
//     import(`intersection-observer`);
//     console.log(`# IntersectionObserver is polyfilled!`);
//   }
// };
