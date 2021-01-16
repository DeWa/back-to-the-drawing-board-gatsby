import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';

import SubLayout from '../layout/subpage';
import NoteListing from '../components/NoteListing/NoteListing';
import SEO from '../components/SEO/SEO';
import config from '../config';
import { NotesQueryQuery } from '../graphql-type';

export interface Props {
  data: NotesQueryQuery;
}

const NotesPage: FunctionComponent<Props> = (props) => {
  const noteEdges = props.data.allMarkdownRemark.edges;

  return (
    <SubLayout>
      <div className="landing-container">
        <div className="posts-container">
          <Helmet title={config.siteTitle} />
          <SEO />
          <NoteListing noteEdges={noteEdges} />
        </div>
      </div>
    </SubLayout>
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
            sources
          }
        }
      }
    }
  }
`;
