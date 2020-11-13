import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';

export interface IProps {
  showLogo?: boolean;
}

const NavbarWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 1.75rem;
`;

const Links = styled.ul`
  display: flex;
  font-family: 'PermanentMarker', Helvetica, Arial, sans-serif;
  color: #d7f3fc;
  font-size: 1.5rem;

  & li {
    margin: 0 1rem;
  }

  & a {
    color: #d7f3fc;
    text-decoration: none;

    &:hover {
      color: #a7bbc2;
    }
  }
`;

const Logo = styled.div`
  font-family: 'PermanentMarker', Helvetica, Arial, sans-serif;
  color: #d7f3fc;
  font-size: 1.5rem;

  & a {
    color: #d7f3fc;
    text-decoration: none;

    &:hover {
      color: #a7bbc2;
    }
  }
`;

const Navbar: FunctionComponent<IProps> = (props) => {
  const { showLogo } = props;

  return (
    <NavbarWrapper>
      <Logo>{showLogo && <a href="/">Back to the Drawing Board</a>}</Logo>
      <Links>
        <li>Notes</li>
        <li>Archive</li>
        <li>About</li>
      </Links>
    </NavbarWrapper>
  );
};

export default Navbar;
