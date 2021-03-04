import React from 'react';
import { graphql, StaticQuery } from 'gatsby';

export default () => {
  return (
    <StaticQuery
      query={graphql`
        query InstaFeed {
          allInstagramContent(limit: 6) {
            nodes {
              media_id
              media_url
              id
              media_type
              permalink
            }
          }
        }
      `}
      render={(data) => {
        const feed = data.allInstagramContent.nodes;
        console.log(feed);
        return (
          <>
            {feed.map((el) => {
              return <a href={el.permalink}><img src={el.media_url} alt="/" /></a>;
            })}
          </>
        );
      }}
    /> 
  );
};
