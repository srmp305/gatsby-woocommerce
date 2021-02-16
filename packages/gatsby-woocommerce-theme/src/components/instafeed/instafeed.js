import React from 'react';
import { graphql, StaticQuery } from 'gatsby';

export default () => {
  return (
    // <StaticQuery
    //   query={graphql`
    //     query InstaFeed {
    //       allInstagramContent(limit: 6) {
    //         nodes {
    //           media_id
    //           media_url
    //           id
    //           media_type
    //         }
    //       }
    //     }
    //   `}
    //   render={(data) => {
    //     const feed = data.allInstagramContent.nodes;
    //     return (
    //       <>
    //         {feed.map((el) => {
    //           return <img src={el.media_url} alt="/" />;
    //         })}
    //       </>
    //     );
    //   }}
    // />
    <></>
  );
};
