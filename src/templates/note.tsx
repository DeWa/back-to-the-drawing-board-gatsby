import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from '@emotion/styled';
import dayjs from 'dayjs';

import Layout from '../layout/subpage';
import Disqus from '../components/Disqus/Disqus';
import SocialLinks from '../components/SocialLinks/SocialLinks';
import SEO from '../components/SEO/SEO';
import config from '../../data/SiteConfig';

export interface Props {
  data: any;
  pageContext: any;
}

const NoteWrapper = styled.article`
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

const NoteInfo = styled.div`
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
const NoteTemplate: FunctionComponent<Props> = (props) => {
  const { data, pageContext } = props;
  const { slug } = pageContext;
  const noteNode = data.markdownRemark;
  const note = noteNode.frontmatter;
  if (!note.id) {
    note.id = slug;
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
          <title>{`${note.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <NoteWrapper>
          <Content>
            <Title>{note.title}</Title>
            <NoteInfo>
              <Category>{note.category}</Category>
              <SeparatorBall />
              <Date>{getDate(note.date)}</Date>
            </NoteInfo>
            <Text dangerouslySetInnerHTML={{ __html: noteNode.html }} />
          </Content>
        </NoteWrapper>
      </div>
    </Layout>
  );
};

export default NoteTemplate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query NoteBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        category
      }
      fields {
        slug
        date
      }
    }
  }
`;
