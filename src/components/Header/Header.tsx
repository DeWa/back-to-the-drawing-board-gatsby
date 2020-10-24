import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';

export interface Props {}

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #d7f3fc;
  min-height: 400px;

  & h1 {
    font-family: 'PermanentMarker', Helvetica, Arial, sans-serif;
    font-size: 4rem;
  }
  & h3 {
    font-family: 'PermanentMarker', Helvetica, Arial, sans-serif;
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
