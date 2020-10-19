import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';

import config from '../../data/SiteConfig';
import Header from '../components/Header/Header';
import styles from './styles/index.module.css';

export interface Props {}

const MainLayout: FunctionComponent<Props> = (props) => {
  const { children } = props;

  return (
    <main className={styles.wrapper}>
      <Helmet>
        <meta name="description" content={config.siteDescription} />
        <html lang="en" />
      </Helmet>
      <Header></Header>
      {children}
    </main>
  );
};

export default MainLayout;
