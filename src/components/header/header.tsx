import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './header.module.scss';
const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? styles.linkActive : styles.link
        }
      >
        Main
      </NavLink>
      <NavLink
        to="controlled"
        className={({ isActive }) =>
          isActive ? styles.linkActive : styles.link
        }
      >
        Controlled
      </NavLink>
      <NavLink
        to="uncontrolled"
        className={({ isActive }) =>
          isActive ? styles.linkActive : styles.link
        }
      >
        Uncontrolled
      </NavLink>
    </header>
  );
};

export default Header;
