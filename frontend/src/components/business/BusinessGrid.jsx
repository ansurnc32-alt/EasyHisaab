import React from 'react';
import styles from './BusinessGrid.module.css';

const BusinessGrid = ({ children }) => {
  return (
    <div className={styles.grid} role="radiogroup" aria-label="Business selection grid">
      {children}
    </div>
  );
};

export default BusinessGrid;
