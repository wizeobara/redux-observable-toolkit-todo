import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Home.module.scss';

export const Home: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>Nothing to See here!</h1>
      <div>
        <p>Just for the sake of using react-router.</p>
        <p>Pretty neat ain&#39;t it?</p>
      </div>
      <Link to="/" className={styles.link}>
        Back to Home..
      </Link>
    </div>
  );
};

export default Home;
