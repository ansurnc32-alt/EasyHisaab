import React from 'react';
import balajiLogo from '../../assets/balaji-logo.png';
import styles from './PdfHeader.module.css';

const PdfHeader = ({ businessName, businessType, date, invoiceNumber, customerName }) => {
  return (
    <header className={styles.header}>
      <div className={styles.brandSection}>
        <div className={styles.logoWrapper}>
          <img src={balajiLogo} alt="Balaji logo" className={styles.logoImage} />
        </div>
      </div>

      <div className={styles.topSection}>
        <div className={styles.businessInfo}>
          <h1 className={styles.businessName}>{businessName}</h1>
          <p className={styles.businessType}>{businessType}</p>
        </div>
        <div className={styles.invoiceMeta}>
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>दिनांक:</span>
            <span>{date}</span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>बिल नंबर:</span>
            <span>{invoiceNumber}</span>
          </div>
        </div>
      </div>
      
      {customerName && (
        <div className={styles.customerSection}>
          <span className={styles.customerLabel}>ग्राहक (Customer)</span>
          <span className={styles.customerName}>{customerName}</span>
        </div>
      )}
    </header>
  );
};

export default PdfHeader;
