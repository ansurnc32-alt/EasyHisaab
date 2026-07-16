import React from 'react';
import styles from './PdfFooter.module.css';

const PdfFooter = () => {
  return (
    <footer className={styles.footer}>
      <span className={styles.footerNote}>Generated using EasyHisaab</span>
      <span className={styles.watermark}>Created by Ansu Kumar</span>
    </footer>
  );
};

export default PdfFooter;
