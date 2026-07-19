import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import styles from './PdfDownloadModal.module.css';

const PDF_OPTIONS = [
  {
    value: 'standard',
    title: 'Standard PDF',
    description: 'Balanced size for everyday sharing',
  },
  {
    value: 'high-quality',
    title: 'High Quality PDF',
    description: 'Sharper output for formal use',
  },
  {
    value: 'print-ready',
    title: 'Print Ready PDF',
    description: 'Optimized for clean printing',
  },
];

const PdfDownloadModal = ({ isOpen, onClose, onDownload }) => {
  const [selectedOption, setSelectedOption] = useState('standard');
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusableElements = Array.from(
      dialog.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    ).filter((element) => !element.hasAttribute('disabled'));

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === 'Tab' && focusableElements.length > 0) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.setTimeout(() => {
      const firstFocusable = focusableElements[0];
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }, 0);

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose} role="presentation">
      <div
        className={styles.modal}
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pdf-download-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.header}>
          <div>
            <h2 id="pdf-download-title" className={styles.title}>
              डाउनलोड विकल्प
            </h2>
            <p className={styles.subtitle}>अपना पसंदीदा PDF प्रारूप चुनें</p>
          </div>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close download options">
            <X size={18} />
          </button>
        </div>

        <fieldset className={styles.options}>
          <legend className={styles.visuallyHidden}>PDF format options</legend>
          {PDF_OPTIONS.map((option) => (
            <label
              key={option.value}
              className={`${styles.option} ${selectedOption === option.value ? styles.optionSelected : ''}`}
            >
              <input
                type="radio"
                name="pdf-format"
                value={option.value}
                checked={selectedOption === option.value}
                onChange={() => setSelectedOption(option.value)}
              />
              <span className={styles.optionText}>
                <span className={styles.optionTitle}>{option.title}</span>
                <span className={styles.optionDescription}>{option.description}</span>
              </span>
            </label>
          ))}
        </fieldset>

        <div className={styles.actions}>
          <button type="button" className={styles.secondaryAction} onClick={onClose}>
            रद्द करें
          </button>
          <button
            type="button"
            className={styles.primaryAction}
            onClick={() => {
              if (onDownload) {
                onDownload(selectedOption);
              }
              onClose();
            }}
          >
            डाउनलोड
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfDownloadModal;
