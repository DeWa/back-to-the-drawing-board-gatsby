import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';

import Post, { PostType } from './Post/Post';
import media from '../../helpers/media';
import { CategoryPageQuery } from '../../graphql-type';
import { Pick2 } from '../../helpers/utils';

type PostEdge = Pick2<CategoryPageQuery, 'allMarkdownRemark', 'edges'>;
export interface IProps {
  postEdges: PostEdge[];
}

const PostListingWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 auto;

  ${media['lg']} {
    width: 960px;
  }
`;

const PostListing: FunctionComponent<IProps> = (props) => {
  const getPostList = () => {
    const postList: PostType[] = props.postEdges.map((postEdge) => {
      return {
        id: postEdge.node.id,
        path: postEdge.node.fields.slug,
        tags: postEdge.node.frontmatter.tags,
        cover: postEdge.node.frontmatter.cover,
        title: postEdge.node.frontmatter.title,
        date: postEdge.node.fields.date,
        excerpt: postEdge.node.excerpt,
        timeToRead: postEdge.node.timeToRead,
        category: postEdge.node.frontmatter.category,
      };
    });

    return postList;
  };
  const postList = getPostList();

  return (
    <PostListingWrapper>
      {
        /* Your post list here. */
        postList.map((post, index) => (
          <Post key={post.id} post={post} first={index === 0} />
        ))
      }
    </PostListingWrapper>
  );
};

export default PostListing;
