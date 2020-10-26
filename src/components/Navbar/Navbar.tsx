import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';

export interface Props {
  showLogo: boolean;
}

const NavbarWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 1rem;
`;

const Links = styled.ul`
  display: flex;
  font-family: 'PermanentMarker', Helvetica, Arial, sans-serif;
  color: #d7f3fc;
  font-size: 1.5rem;

  & li {
    margin: 0 1rem;
  }
`;

const Logo = styled.div`
  font-family: 'PermanentMarker', Helvetica, Arial, sans-serif;
  color: #d7f3fc;
  font-size: 1.5rem;
`;

const Navbar: FunctionComponent<Props> = (props) => {
  const { showLogo } = props;

  return (
    <NavbarWrapper>
      {showLogo && <Logo>Back to the Drawing Board</Logo>}
      <Links>
        <li>Categories</li>
        <li>Notes</li>
        <li>About</li>
      </Links>
    </NavbarWrapper>
  );
};

export default Navbar;
