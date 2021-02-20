import React from 'react';
import loaderimg from '../../images/loader.svg';
const Loader = ( ) => {
  

  return (
    <div className="loader-container">
      <img className="loader" src={loaderimg} />
    </div>
  );
};

/**
 *  Exporting Just the Loader as well without static query for storybook,
 *  as static query does not work in storybook
 */
export { Loader };
