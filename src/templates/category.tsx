import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';

import MainLayout from '../layout/main';
import PostListing from '../components/PostListing/PostListing';
import config from '../../data/SiteConfig';

export interface Props {
  pageContext: any;
  data: any;
}

const CategoryTemplate: FunctionComponent<Props> = (props) => {
  const { category } = props.pageContext;
  const postEdges = props.data.allMarkdownRemark.edges;

  return (
    <MainLayout>
      <div className="category-container">
        <Helmet
          title={`Posts in category "${category}" | ${config.siteTitle}`}
        />
        <PostListing postEdges={postEdges} />
      </div>
    </MainLayout>
  );
};

export default CategoryTemplate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            cover
            date
          }
        }
      }
    }
  }
`;
