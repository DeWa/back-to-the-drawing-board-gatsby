import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from '@emotion/styled';
import dayjs from 'dayjs';

import Layout from '../layout/subpage';
import Disqus from '../components/Disqus/Disqus';
import PostTags from '../components/PostTags/PostTags';
import SocialLinks from '../components/SocialLinks/SocialLinks';
import SEO from '../components/SEO/SEO';
import Footer from '../components/Footer/Footer';
import config from '../../data/SiteConfig';

export interface Props {
  data: any;
  pageContext: any;
}

const PostWrapper = styled.article`
  background: rgb(240, 240, 240);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  margin: 10px;
  border-radius: 5px;
  padding: 0.5rem;
  width: 1040px;
  margin: 0 auto;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
`;

const Cover = styled.div`
  min-height: 300px;
`;

const Text = styled.p`
  letter-spacing: -0.003em;
  line-height: 32px;
  overflow-wrap: break-word;
  word-break: break-word;

  & p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
`;

const Content = styled.section`
  padding: 0 2rem 2rem 2rem;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 3rem;
  padding: 1rem 0 0 0;
`;

const PostInfo = styled.div`
  padding: 1rem 0;
  display: flex;
  color: #3f3f3f;
  font-size: 0.75rem;
`;

const Category = styled.div`
  text-transform: uppercase;
  font-weight: bold;
`;
const Date = styled.div`
  text-transform: uppercase;
`;
const SeparatorBall = styled.span`
  padding: 0 0.25rem;

  &:after {
    content: '•';
  }
`;
const PostTemplate: FunctionComponent<Props> = (props) => {
  const { data, pageContext } = props;
  const { slug } = pageContext;
  const postNode = data.markdownRemark;
  const post = postNode.frontmatter;
  if (!post.id) {
    post.id = slug;
  }

  const getDate = (date: Date) => {
    if (dayjs().diff(date, 'day') < 8) {
      return dayjs(date).fromNow();
    } else {
      return dayjs(date).format('MMMM DD, YYYY');
    }
  };

  return (
    <Layout>
      <div>
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <PostWrapper>
          <Cover>
            <Img
              style={{ minHeight: '100%', borderRadius: '5px' }}
              fluid={post.cover.childImageSharp.fluid}
            />
          </Cover>
          <Content>
            <Title>{post.title}</Title>
            <PostTags tags={post.tags} />
            <PostInfo>
              <Category>{post.category}</Category>
              <SeparatorBall />
              <Date>{getDate(post.date)}</Date>
            </PostInfo>
            <Text dangerouslySetInnerHTML={{ __html: postNode.html }} />
            <div className="post-meta">
              <SocialLinks postPath={slug} postNode={postNode} />
            </div>
            <Disqus postNode={postNode} />
            <Footer config={config} />
          </Content>
        </PostWrapper>
      </div>
    </Layout>
  );
};

export default PostTemplate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        cover {
          childImageSharp {
            fluid(quality: 90, maxWidth: 400) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        date
        category
        tags
      }
      fields {
        slug
        date
      }
    }
  }
`;
