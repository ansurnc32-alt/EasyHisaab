import React from 'react';
import styles from './PdfItemsTable.module.css';

const PdfItemsTable = ({ items, showPrice = true }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table} aria-label="Invoice items">
        <thead>
          <tr>
            <th className={styles.th} scope="col">सामान (Item)</th>
            <th className={`${styles.th} ${styles.alignCenter}`} scope="col">मात्रा (Qty)</th>
            <th className={`${styles.th} ${styles.alignCenter}`} scope="col">यूनिट (Unit)</th>
            {showPrice && <th className={`${styles.th} ${styles.alignRight}`} scope="col">दर (Price)</th>}
            <th className={`${styles.th} ${styles.alignRight}`} scope="col">राशि (Amount)</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td className={styles.td}>{item.name || '—'}</td>
              <td className={`${styles.td} ${styles.alignCenter}`}>{item.quantity || '—'}</td>
              <td className={`${styles.td} ${styles.alignCenter}`}>{item.unit || '—'}</td>
              {showPrice && (
                <td className={`${styles.td} ${styles.alignRight}`}>
                  {item.price !== undefined && item.price !== null && item.price !== '' ? `₹${item.price}` : '—'}
                </td>
              )}
              <td className={`${styles.td} ${styles.alignRight} ${styles.amount}`}>
                {item.amount !== undefined && item.amount !== null && item.amount !== '' ? `₹${item.amount}` : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PdfItemsTable;
