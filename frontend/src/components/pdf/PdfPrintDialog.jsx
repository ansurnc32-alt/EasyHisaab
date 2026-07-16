import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import styles from './PdfPrintDialog.module.css';

const PdfPrintDialog = ({ isOpen, onClose }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose} role="presentation">
      <div
        className={styles.dialog}
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="print-dialog-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.header}>
          <h2 id="print-dialog-title" className={styles.title}>प्रिंट विकल्प</h2>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close print dialog">
            <X size={18} />
          </button>
        </div>

        <p className={styles.message}>Printing will be available after backend integration.</p>

        <div className={styles.actions}>
          <button type="button" className={styles.primaryAction} onClick={onClose}>
            ठीक है
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfPrintDialog;
