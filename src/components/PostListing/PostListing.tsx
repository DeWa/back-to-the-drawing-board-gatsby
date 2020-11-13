import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';

import Post, { PostType } from './Post/Post';

export interface Props {}

const PostListingWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 960px;
  margin: 0 auto;
`;

const PostListing: FunctionComponent<Prop> = (props) => {
  const getPostList = () => {
    const postList: PostType[] = [];
    props.postEdges.forEach((postEdge) => {
      postList.push({
        id: postEdge.node.id,
        path: postEdge.node.fields.slug,
        tags: postEdge.node.frontmatter.tags,
        cover: postEdge.node.frontmatter.cover,
        title: postEdge.node.frontmatter.title,
        date: postEdge.node.fields.date,
        excerpt: postEdge.node.excerpt,
        timeToRead: postEdge.node.timeToRead,
        category: postEdge.node.frontmatter.category,
      });
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
