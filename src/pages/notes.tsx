import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';

import MainLayout from '../layout/main';
import PostListing from '../components/PostListing/PostListing';
import SEO from '../components/SEO/SEO';
import config from '../../data/SiteConfig';

export interface Props {
  data: any;
}

const NotesPage: FunctionComponent<Props> = (props) => {
  const noteEdges = props.data.allMarkdownRemark.edges;

  return (
    <MainLayout>
      <div className="landing-container">
        <div className="posts-container">
          <Helmet title={config.siteTitle} />
          <SEO />
          <PostListing postEdges={noteEdges} />
        </div>
      </div>
    </MainLayout>
  );
};

export default NotesPage;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query NotesQuery {
    allMarkdownRemark(
      sort: { fields: [fields___date], order: DESC }
      filter: { fields: { collection: { eq: "notes" } } }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          id
          excerpt
          timeToRead
          frontmatter {
            title
            date
            category
          }
        }
      }
    }
  }
`;
