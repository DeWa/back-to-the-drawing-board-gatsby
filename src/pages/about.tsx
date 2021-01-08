import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import styled from '@emotion/styled';

import SubLayout from '../layout/subpage';
import SEO from '../components/SEO/SEO';
import config from '../../data/SiteConfig';
import TopLists from '../components/TopLists/TopLists';

const Wrapper = styled.div`
  min-height: 90vh;
  display: flex;
`;

const HelloTitle = styled.div`
  & h1 {
    font-size: 2.5rem;
    text-align: center;
    color: #d7f3fc;
    font-family: 'PermanentMarker', Helvetica, Arial, sans-serif;
  }
`;
const PhotoWrapper = styled.div`
  text-align: center;
  padding-top: 4rem;
`;
const Photo = styled.div`
  width: 250px;
  height: 250px;
  display: inline-block;
  background: #fff;
  padding: 10px 10px 300px 10px;
  transform: rotate(-10deg);
  box-shadow: 4px 4px 8px -4px rgba(0, 0, 0, 0.75);
  backface-visibility: hidden;

  &:before {
    content: '';
    display: block;
    position: absolute;
    left: -30px;
    top: -10px;
    width: 75px;
    height: 25px;
    z-index: 1;
    background-color: rgba(222, 220, 198, 0.7);
    transform: rotate(-11deg);
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    right: -20px;
    top: -10px;
    width: 85px;
    height: 25px;
    z-index: 1;
    background-color: rgba(222, 220, 198, 0.7);
    transform: rotate(30deg);
  }

  & img,
  picture {
    width: 100%;
    height: auto;
    filter: sepia(50%) contrast(150%) saturate(80%) brightness(90%)
      hue-rotate(-25deg);
  }
`;
const PhotoTitleWrapper = styled.section`
  text-align: right;
  flex: 50%;
`;
const DescriptionWrapper = styled.section`
  flex: 50%;
`;
const DescriptionText = styled.article`
  width: 450px;
  background: rgb(240, 240, 240);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  margin: 10px;
  border-radius: 5px;
  padding: 1rem 2rem 2rem 2rem;
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
    text-align: justify;
    word-break: break-word;
  }

  & .smalltext {
    font-size: 0.45rem;
  }
`;

const AboutPage: FunctionComponent = () => {
  return (
    <SubLayout>
      <Helmet title={`${config.siteTitle} :: About`} />
      <SEO />
      <Wrapper>
        <PhotoTitleWrapper>
          <HelloTitle>
            <h1>HI!</h1>
            <h1>My name is Joonas</h1>
          </HelloTitle>
          <PhotoWrapper>
            <Photo>
              <picture>
                <source srcSet="/img/profile.webp" type="image/webp" />
                <source srcSet="/img/profile.jpg" type="image/jpeg" />
                <img src="/img/profile.jpg" alt="Profile" />
              </picture>
            </Photo>
          </PhotoWrapper>
        </PhotoTitleWrapper>
        <DescriptionWrapper>
          <DescriptionText>
            <p>
              I'm 30<span className="smalltext">something</span> year-old
              software developer from Tampere, Finland. I've been doing web
              development professionally almost 7 years now and it's the thing
              I'm best at. But my real passion is in the product development. I
              love to try new things and techs and innovate something new. I've
              got dozens of project ideas just laying around.
            </p>
            <p>
              And that's also the idea behind this blog. To write down my my
              experiences with doing these projects and maybe giving tips to
              someone who wants do these projects as well (Every now I might
              post something about new framework or some new gadget).
            </p>
            <TopLists></TopLists>
          </DescriptionText>
        </DescriptionWrapper>
      </Wrapper>
    </SubLayout>
  );
};

export default AboutPage;
