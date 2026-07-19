import React, { forwardRef } from 'react';
import styles from './PdfPaper.module.css';

const PdfPaper = forwardRef(({ children }, ref) => {
  return (
    <div className={styles.paperWrapper}>
      <div ref={ref} className={styles.paper}>
        {children}
      </div>
    </div>
  );
});

PdfPaper.displayName = 'PdfPaper';

export default PdfPaper;
