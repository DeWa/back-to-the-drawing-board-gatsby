import React, { FunctionComponent } from 'react';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  RedditShareButton,
  FacebookShareCount,
  RedditShareCount,
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  LinkedinIcon,
  RedditIcon,
} from 'react-share';
import styled from '@emotion/styled';

import config from '../../config';
import { IPostNode } from '../../types';

export interface IProps {
  postNode: IPostNode;
  postPath: string;
  mobile: boolean;
}

const SocialLinksWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
`;
const Title = styled.div`
  font-size: 0.75rem;
  text-transform: uppercase;
  font-family: 'Arvo', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol';
  padding: 0.5rem;
`;
const Links = styled.div``;

const SocialLinks: FunctionComponent<IProps> = (props) => {
  const { postNode, postPath, mobile } = props;
  const post = postNode.frontmatter;
  const url = `${config.siteUrl}${config.pathPrefix}${postPath}`;
  const iconSize = mobile ? 36 : 48;
  const filter = (count: number) => (count > 0 ? count : '');
  const renderShareCount = (count: number) => (
    <div className="share-count">{filter(count)}</div>
  );

  return (
    <SocialLinksWrapper>
      <Title> Share this post</Title>
      <Links>
        <RedditShareButton url={url} title={post.title}>
          <RedditIcon round size={iconSize} />
          <RedditShareCount url={url}>
            {(count) => renderShareCount(count)}
          </RedditShareCount>
        </RedditShareButton>
        <TwitterShareButton url={url} title={post.title}>
          <TwitterIcon round size={iconSize} />
        </TwitterShareButton>
        <FacebookShareButton url={url} quote={postNode.excerpt}>
          <FacebookIcon round size={iconSize} />
          <FacebookShareCount url={url}>
            {(count) => renderShareCount(count)}
          </FacebookShareCount>
        </FacebookShareButton>
        <LinkedinShareButton
          url={url}
          title={post.title}
          description={postNode.excerpt}
        >
          <LinkedinIcon round size={iconSize} />
        </LinkedinShareButton>
        <TelegramShareButton url={url}>
          <TelegramIcon round size={iconSize} />
        </TelegramShareButton>
      </Links>
    </SocialLinksWrapper>
  );
};

export default SocialLinks;
