import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  const location = useLocation();

  return (
    <nav className={styles.navbar}>
      <div className={styles.appNameContainer}>
          <img src="/logo.png" alt="[logo]" className={styles.appLogo}/>
          <span className={styles.appNameStock}>Stock</span>
          <span className={styles.appNameMagnifier}>Magnifier</span>
      </div>
      <ul className={styles.navLinks}>
        <li className={styles.navItem}>
          <Link
            to="/analysis"
            className={`${styles.navLink} ${
              location.pathname.startsWith('/analysis') ? styles.active : ''
            }`}
          >
            Analysis
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link
            to="/recommendations"
            className={`${styles.navLink} ${
              location.pathname === '/recommendations' ? styles.active : ''
            }`}
          >
            Recommendations
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;