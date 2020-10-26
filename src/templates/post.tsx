import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';

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
  width: 960px;
  margin: 0 auto;
`;

const PostTemplate: FunctionComponent<Props> = (props) => {
  const { data, pageContext } = props;
  const { slug } = pageContext;
  const postNode = data.markdownRemark;
  const post = postNode.frontmatter;
  if (!post.id) {
    post.id = slug;
  }

  return (
    <Layout>
      <div>
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <PostWrapper>
          <h1>{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
          <div className="post-meta">
            <PostTags tags={post.tags} />
            <SocialLinks postPath={slug} postNode={postNode} />
          </div>
          <Disqus postNode={postNode} />
          <Footer config={config} />
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
