import React, { FunctionComponent } from 'react';
import { Link } from 'gatsby';

import { PostType } from '../PostListing';
import styles from './styles.module.css';

export interface Props {
  post: PostType;
}

const Post: FunctionComponent<Props> = (props) => {
  console.log(props);
  return <article className={styles.wrapper}>dasasdasd</article>;
};
{
  /* <Link to={post.path} key={post.title}>
<h1>{post.title}</h1>
</Link> */
}
export default Post;
