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

const IndexPage: FunctionComponent<Props> = (props) => {
  const postEdges = props.data.allMarkdownRemark.edges;

  return (
    <MainLayout>
      <div className="landing-container">
        <div className="posts-container">
          <Helmet title={config.siteTitle} />
          <SEO />
          <PostListing postEdges={postEdges} />
        </div>
      </div>
    </MainLayout>
  );
};

export default IndexPage;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query LandingQuery {
    allMarkdownRemark(
      sort: { fields: [fields___date], order: DESC }
      filter: { fields: { collection: { eq: "posts" } } }
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
            tags
            date
            cover {
              childImageSharp {
                fluid(quality: 90, maxWidth: 400) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`;
