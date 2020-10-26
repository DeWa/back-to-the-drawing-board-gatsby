import React, { FunctionComponent } from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import Img from 'gatsby-image';
import dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export interface Props {
  post: PostType;
  first: boolean;
}
export interface PostType {
  id: string;
  path: string;
  tags: string[];
  cover: any;
  title: string;
  date: Date;
  excerpt: string;
  timeToRead: number;
  category: string;
}

export const PostWrapper = styled.article<{ first: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.first ? 'row' : 'column')};
  position: relative;
  background: rgb(240, 240, 240);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  min-height: ${(props) => (props.first ? '270px' : '300px')};
  width: ${(props) => (props.first ? '960px' : '300px')};
  margin: 10px;
  border-radius: 5px;
  padding: 0.5rem;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.01);
  }
`;

const PostCover = styled.div<{ first: boolean }>`
  min-width: ${(props) => (props.first ? '60%' : '100%')};
  min-height: ${(props) => (props.first ? '100%' : '200px')};
`;

const PostContent = styled.section<{ first: boolean }>`
  display: flex;
  flex-direction: column;
  padding: ${(props) => (props.first ? '0 1rem 3rem 1rem' : '0.5rem 0 3rem 0')};
`;

const PostInfo = styled.div`
  display: flex;
  color: #3f3f3f;
  font-size: 0.75rem;
`;

const Title = styled.h2<{ first: boolean }>`
  ${(props) => (props.first ? '' : 'font-size: 1.4rem;')}
  padding: 1rem 0;
`;
const Excerpt = styled.p`
  letter-spacing: -0.003em;
  line-height: 2rem;
`;
const ReadMore = styled.div`
  font-weight: bold;
  padding: 1rem 0;
  position: absolute;
  bottom: 1rem;
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

const getDate = (date: Date) => {
  if (dayjs().diff(date, 'day') < 8) {
    return dayjs(date).fromNow();
  } else {
    return dayjs(date).format('MMMM DD, YYYY');
  }
};

const Post: FunctionComponent<Props> = (props) => {
  const { post } = props;
  console.log(post);

  return (
    <PostWrapper first={props.first}>
      <PostCover first={props.first}>
        <Img
          style={{ minHeight: '100%', borderRadius: '5px' }}
          fluid={props.post.cover.childImageSharp.fluid}
        />
      </PostCover>
      <PostContent first={props.first}>
        <PostInfo>
          <Category>{post.category}</Category>
          <SeparatorBall />
          <Date>{getDate(post.date)}</Date>
        </PostInfo>
        <Title first={props.first}>{post.title}</Title>
        <Excerpt>{post.excerpt}</Excerpt>
        <Link to={post.path}>
          <ReadMore>Read more...</ReadMore>
        </Link>
      </PostContent>
    </PostWrapper>
  );
};
{
  /* <Link to={post.path} key={post.title}>
<h1>{post.title}</h1>
</Link> */
}
export default Post;
