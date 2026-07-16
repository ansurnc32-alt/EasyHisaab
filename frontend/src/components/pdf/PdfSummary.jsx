import React from 'react';
import styles from './PdfSummary.module.css';

const PdfSummary = ({ subtotal, discount, grandTotal, showTotal = true }) => {
  if (!showTotal) return null;

  return (
    <div className={styles.summaryContainer}>
      <div className={styles.summaryRow}>
        <span className={styles.label}>कुल (Subtotal):</span>
        <span>₹{subtotal}</span>
      </div>
      {discount > 0 && (
        <div className={styles.summaryRow}>
          <span className={styles.label}>छूट (Discount):</span>
          <span>-₹{discount}</span>
        </div>
      )}
      <div className={styles.grandTotalRow}>
        <span className={styles.label}>कुल राशि (Grand Total):</span>
        <span>₹{grandTotal}</span>
      </div>
    </div>
  );
};

export default PdfSummary;
