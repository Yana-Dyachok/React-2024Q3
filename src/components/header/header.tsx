import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.scss';
const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Link to="form">Form</Link>
      <Link to="form-hook">Hook form</Link>
    </header>
  );
};

export default Header;
