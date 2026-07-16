import React from 'react';
import styles from './PdfPaper.module.css';

const PdfPaper = ({ children }) => {
  return (
    <div className={styles.paperWrapper}>
      <div className={styles.paper}>
        {children}
      </div>
    </div>
  );
};

export default PdfPaper;
