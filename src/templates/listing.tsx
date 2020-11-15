import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import { graphql, Link } from 'gatsby';
import styled from '@emotion/styled';

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

const PagingContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem auto;
  padding: 0 0;
  font-family: 'Arvo', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol';
  font-size: 1.15rem;
  border-radius: 5px;
  width: 400px;
  background: #0d1f4b;

  & .page-number {
    padding: 0.5rem 0.75rem;
    border-left: solid #6990f3 1px;
  }

  & .pagination-arrow {
    padding: 0.5rem 1.25rem;
  }

  & .current-page {
    background: #6990f3;
    color: #fff;
  }

  & a {
    color: #fff;
    text-decoration: none;
  }

  & a:hover {
    color: #c0c0c0;
  }
`;

const Numbers = styled.div`
  display: flex;
  & .page-number::last-child {
  }
`;

const Paging = (props: { pageContext: IPageContext }) => {
  const { currentPageNum, pageCount } = props.pageContext;
  const prevPage = currentPageNum - 1 === 1 ? '/' : `/${currentPageNum - 1}/`;
  const nextPage = `/${currentPageNum + 1}/`;
  const isFirstPage = currentPageNum === 1;
  const isLastPage = currentPageNum === pageCount;

  return (
    <PagingContainer>
      {!isFirstPage && (
        <div className="pagination-arrow">
          <Link to={prevPage}>← Previous</Link>
        </div>
      )}
      <Numbers>
        {[...Array(pageCount)].map((_val, index) => {
          const pageNum = index + 1;
          return (
            <Link
              key={`listing-page-${pageNum}`}
              to={pageNum === 1 ? '/' : `/${pageNum}/`}
            >
              <div
                className={
                  pageNum === currentPageNum
                    ? 'current-page page-number'
                    : 'page-number'
                }
              >
                {pageNum}
              </div>
            </Link>
          );
        })}
      </Numbers>
      {!isLastPage && (
        <div className="pagination-arrow">
          <Link to={nextPage}>Next →</Link>
        </div>
      )}
    </PagingContainer>
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
