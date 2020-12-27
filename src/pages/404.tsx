import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import styled from '@emotion/styled';

import SubpageLayout from '../layout/subpage';
import config from '../../data/SiteConfig';

const Wrapper = styled.div`
  height: 90vh;
  text-align: center;

  & h1 {
    font-size: 6rem;
    color: #d7f3fc;
  }

  & h2 {
    font-size: 2.3rem;
    color: #d7f3fc;
  }
`;

class NotFoundPage extends Component {
  render() {
    return (
      <SubpageLayout>
        <Helmet title={`${config.siteTitle} - Page Not Found!`} />
        <Wrapper>
          <h1>404</h1>
          <h2>Page Not Found!</h2>
        </Wrapper>
      </SubpageLayout>
    );
  }
}

export default NotFoundPage;
