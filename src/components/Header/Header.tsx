import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';

export interface Props {}

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #d7f3fc;
  min-height: 300px;
  width: 100vw;
  overflow: hidden;

  & h1 {
    font-family: 'PermanentMarker', Helvetica, Arial, sans-serif;
    font-size: 4.5rem;
    transform: rotate(-4deg);
  }
  & h3 {
    margin-top: 1rem;
    font-family: 'PermanentMarker', Helvetica, Arial, sans-serif;
    transform: rotate(-4deg);
  }
`;
const Header: FunctionComponent<Props> = (props) => {
  return (
    <HeaderWrapper>
      <h1>Back to the Drawing Board</h1>
      <h3>— Web development, games and much more —</h3>
    </HeaderWrapper>
  );
};

export default Header;
