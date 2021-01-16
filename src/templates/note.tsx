import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import { graphql, Link } from 'gatsby';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { FaLongArrowAltLeft } from 'react-icons/fa';

import Layout from '../layout/subpage';
import config from '../config';
import { NoteBySlugQuery } from '../graphql-type';
import media from '../helpers/media';

export interface Props {
  data: NoteBySlugQuery;
  pageContext: any;
}

const NoteWrapper = styled.article`
  background: rgb(240, 240, 240);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  margin: 10px;
  border-radius: 5px;
  padding: 0.5rem;
  width: 100%;
  margin: 0 auto;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;

  ${media['xl']} {
    width: 1040px;
  }
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
const Sources = styled.div`
  padding: 0 2rem 2rem 2rem;

  & h4 {
    text-align: center;
    padding-bottom: 1rem;
  }
`;
const Source = styled.div``;
const BackButton = styled.div`
  padding: 0 2rem 1rem 2rem;

  & a {
    color: #000;
    text-decoration: none;

    &:hover {
      color: #292828;
    }
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
  console.log(data);

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
          <BackButton>
            <Link to="/notes">
              <FaLongArrowAltLeft
                style={{ display: 'inline-block', paddingTop: '5px' }}
              />{' '}
              Back to notes
            </Link>
          </BackButton>
          <Content>
            <Title>{note.title}</Title>
            <NoteInfo>
              <Category>{note.category}</Category>
              <SeparatorBall />
              <Date>Updated: {getDate(note.date)}</Date>
            </NoteInfo>
            <Text dangerouslySetInnerHTML={{ __html: noteNode.html }} />
          </Content>
          {note.sources && (
            <Sources>
              <h4>Sources</h4>
              {note.sources.map((source) => {
                return <Source dangerouslySetInnerHTML={{ __html: source }} />;
              })}
            </Sources>
          )}
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
        sources
      }
      fields {
        slug
        date
      }
    }
  }
`;
