import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import { graphql, Link } from 'gatsby';

import MainLayout from '../layout/main';
import PostListing from '../components/PostListing/PostListing';
import SEO from '../components/SEO/SEO';
import config from '../../data/SiteConfig';

export interface IPageContext {
  currentPageNum: number;
  limit: number;
  pageCount: number;
  skip: number;
}
export interface Props {
  data: {
    allMarkdownRemark: {
      edges: {
        [id: number]: any;
      };
    };
  };
  pageContext: IPageContext;
}

const Paging = (props: { pageContext: IPageContext }) => {
  const { currentPageNum, pageCount } = props.pageContext;
  const prevPage = currentPageNum - 1 === 1 ? '/' : `/${currentPageNum - 1}/`;
  const nextPage = `/${currentPageNum + 1}/`;
  const isFirstPage = currentPageNum === 1;
  const isLastPage = currentPageNum === pageCount;

  return (
    <div className="paging-container">
      {!isFirstPage && <Link to={prevPage}>Previous</Link>}
      {[...Array(pageCount)].map((_val, index) => {
        const pageNum = index + 1;
        return (
          <Link
            key={`listing-page-${pageNum}`}
            to={pageNum === 1 ? '/' : `/${pageNum}/`}
          >
            {pageNum}
          </Link>
        );
      })}
      {!isLastPage && <Link to={nextPage}>Next</Link>}
    </div>
  );
};
const IndexPage: FunctionComponent<Props> = (props) => {
  const postEdges = props.data.allMarkdownRemark.edges;

  return (
    <MainLayout>
      <div className="landing-container">
        <div className="posts-container">
          <Helmet title={config.siteTitle} />
          <SEO />
          <PostListing postEdges={postEdges} />
          <Paging pageContext={props.pageContext} />
        </div>
      </div>
    </MainLayout>
  );
};

export default IndexPage;
/* eslint no-undef: "off" */
export const listingQuery = graphql`
  query ListingQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [fields___date], order: DESC }
      filter: { fields: { collection: { eq: "posts" } } }
      limit: $limit
      skip: $skip
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
            category
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
