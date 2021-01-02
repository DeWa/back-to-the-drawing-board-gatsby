import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';

import SubLayout from '../layout/subpage';
import SEO from '../components/SEO/SEO';
import config from '../../data/SiteConfig';

export interface Props {
  data: any;
}

const Wrapper = styled.div`
  height: 90vh;
  text-align: center;

  & h2 {
    font-weight: bold;
    font-size: 2.3rem;
    color: #d7f3fc;
  }
`;

const ArchivePage: FunctionComponent<Props> = (props) => {
  return (
    <SubLayout>
      <Wrapper>
        <Helmet title={config.siteTitle} />
        <SEO />
        <h2>Coming soon...</h2>
      </Wrapper>
    </SubLayout>
  );
};

export default ArchivePage;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query ArchiveQuery {
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
