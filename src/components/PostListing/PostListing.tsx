import React, { FunctionComponent } from 'react';

import Post from './Post/Post';
import styles from './styles.module.css';

export interface PostType {
  id: string;
  path: string;
  tags: string[];
  cover: string;
  title: string;
  date: Date;
  excerpt: string;
  timeToRead: number;
}

export interface Props {}

const PostListing: FunctionComponent<Prop> = (props) => {
  const getPostList = () => {
    const postList: PostType[] = [];
    props.postEdges.forEach((postEdge) => {
      console.log(postEdge);
      postList.push({
        id: postEdge.node.id,
        path: postEdge.node.fields.slug,
        tags: postEdge.node.frontmatter.tags,
        cover: postEdge.node.frontmatter.cover,
        title: postEdge.node.frontmatter.title,
        date: postEdge.node.fields.date,
        excerpt: postEdge.node.excerpt,
        timeToRead: postEdge.node.timeToRead,
      });
    });
    return postList;
  };
  const postList = getPostList();

  return (
    <div className={styles.wrapper}>
      {
        /* Your post list here. */
        postList.map((post) => (
          <Post key={post.id} post={post}></Post>
        ))
      }
    </div>
  );
};

export default PostListing;
