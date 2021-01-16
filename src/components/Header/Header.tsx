import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';

import config from '../../config';
import media from '../../helpers/media';

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #d7f3fc;
  min-height: 300px;
  width: 100vw;
  overflow: hidden;
  text-align: center;
  padding-bottom: 1.5rem;

  & h1 {
    font-family: 'PermanentMarker', Helvetica, Arial, sans-serif;
    font-size: 3.5rem;
    transform: rotate(-4deg);

    ${media['lg']} {
      font-size: 4.5rem;
    }
  }
  & h3 {
    margin-top: 1rem;
    font-family: 'PermanentMarker', Helvetica, Arial, sans-serif;
    transform: rotate(-4deg);
    font-size: 1.25rem;

    ${media['lg']} {
      font-size: 24px;
    }
  }
`;
const Header: FunctionComponent = () => {
  return (
    <HeaderWrapper>
      <h1>{config.siteTitle}</h1>
      <h3>— {config.siteDescription} —</h3>
    </HeaderWrapper>
  );
};

export default Header;
