import React, { useState, FunctionComponent } from 'react';
import ReactDisqusComments from 'react-disqus-comments';
import urljoin from 'url-join';

import config from '../../../data/SiteConfig';

interface Props {
  postNode: any;
}

const Disqus: FunctionComponent<Props> = (props) => {
  const [toastsState, setToastsState] = useState([]);

  const onSnackbarDismiss = () => {
    const [, ...toasts] = toastsState;
    setToastsState(toasts);
  };

  const notifyAboutComment = () => {
    const toasts = toastsState.slice();
    toasts.push({ text: 'New comment available!' });
    setToastsState(toasts);
  };

  const { postNode } = props;
  if (!config.disqusShortname) {
    return null;
  }
  const post = postNode.frontmatter;
  const url = urljoin(config.siteUrl, config.pathPrefix, postNode.fields.slug);
  return (
    <ReactDisqusComments
      shortname={config.disqusShortname}
      identifier={post.title}
      title={post.title}
      url={url}
      category_id={post.category_id || null}
      onNewComment={notifyAboutComment}
    />
  );
};

export default Disqus;
