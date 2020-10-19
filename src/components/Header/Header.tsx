import React, { FunctionComponent } from 'react';

import styles from './styles.module.css';

export interface Props {}

const Header: FunctionComponent<Props> = (props) => {
  return (
    <header className={styles.wrapper}>
      <h1>Back to the Drawing Board</h1>
      <h3>— Web development, games and much more —</h3>
    </header>
  );
};

export default Header;
