import React, { FunctionComponent, useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { FaBars } from 'react-icons/fa';

import config from '../../config';
import media from '../../helpers/media';

export interface IProps {
  showLogo?: boolean;
}

const Links = styled.ul`
  display: none;
  ${media['md']} {
    display: flex;
  }

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

const MobileNav = styled.nav`
  display: flex;
  flex-direction: row;
  width: 100vw;
  padding: 0 1rem;

  ${media['md']} {
    display: none;
  }
`;

const NavbarWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;

  width: ${media['md']} {
    padding: 0.75rem 1.75rem;
  }
`;

const Logo = styled.div<{ showLogo: boolean }>`
  display: none;
  ${(props) => !props.showLogo && 'display: none;'}
  font-family: 'PermanentMarker', Helvetica, Arial, sans-serif;
  color: #d7f3fc;
  font-size: 1.5rem;
  padding: 0 1rem;

  ${media['md']} {
    display: block;
  }

  & a {
    color: #d7f3fc;
    text-decoration: none;

    &:hover {
      color: #a7bbc2;
    }
  }
`;

const MobileNavBar = styled.div`
  flex: 50%;
  text-align: right;
  & button {
    border: none;
    background: transparent;
    font-size: 2rem;
    cursor: pointer;
    width: 40px;
  }
  & button svg {
    color: hsla(0, 0%, 99%, 1);
  }
`;
const MobileLogo = styled.div<{ showLogo: boolean }>`
  ${(props) => !props.showLogo && 'display: none;'}
  flex: 50%;
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

const MobileMenu = styled.div<{ isMenuOpen: boolean }>`
  & a {
    text-decoration: none;
  }

  & ul {
    background: #0d1f4b;
    border: ${(props) => (props.isMenuOpen ? '1px solid #5983ed' : 'none')};
    max-width: 100vw;
    text-align: center;
    transition: height 0.09s ease-in;
    overflow: hidden;
    padding: ${(props) => (props.isMenuOpen ? '1rem 0' : '0')};
    height: ${(props) => (props.isMenuOpen ? '200px' : '0px')};
  }
  & li {
    font-family: 'PermanentMarker', Helvetica, Arial, sans-serif;
    font-size: 1.75rem;
    color: hsla(0, 0%, 99%, 1);
    padding: 0.75rem 0;
  }
`;

const Navbar: FunctionComponent<IProps> = (props) => {
  const { showLogo } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <NavbarWrapper>
        <Logo showLogo={showLogo}>
          {showLogo && <a href="/">{config.siteTitle}</a>}
        </Logo>
        <Links>
          <li>
            <Link to={'/archive'}>Archive</Link>
          </li>
          <li>
            <Link to={'/notes'}>Notes</Link>
          </li>
          <li>
            <Link to={'/about'}>About</Link>
          </li>
        </Links>
        <MobileNav>
          <MobileLogo showLogo={showLogo}>
            {showLogo && <a href="/">{config.siteTitle}</a>}
          </MobileLogo>
          <MobileNavBar>
            <button onClick={toggleMenu}>
              <FaBars />
            </button>
          </MobileNavBar>
        </MobileNav>
      </NavbarWrapper>
      <MobileMenu isMenuOpen={isMenuOpen}>
        <ul>
          <Link to="/archive">
            <li>Archive</li>
          </Link>
          <Link to="/notes">
            <li>Notes</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
        </ul>
      </MobileMenu>
    </>
  );
};

export default Navbar;
