import React, { useEffect, useRef } from 'react';
import { MessageCircle, Send, Mail, Copy, X } from 'lucide-react';
import styles from './PdfShareSheet.module.css';

const SHARE_OPTIONS = [
  { label: 'WhatsApp', icon: MessageCircle },
  { label: 'Telegram', icon: Send },
  { label: 'Email', icon: Mail },
  { label: 'Copy Link', icon: Copy },
];

const PdfShareSheet = ({ isOpen, onClose }) => {
  const sheetRef = useRef(null);

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
        className={styles.sheet}
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label="Share options"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>शेयर करें</h2>
            <p className={styles.subtitle}>अपने पसंदीदा माध्यम से साझा करें</p>
          </div>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close share options">
            <X size={18} />
          </button>
        </div>

        <div className={styles.options}>
          {SHARE_OPTIONS.map((option) => {
            const Icon = option.icon;
            return (
              <button key={option.label} type="button" className={styles.option} aria-label={option.label}>
                <span className={styles.iconWrap}>
                  <Icon size={20} />
                </span>
                <span className={styles.optionLabel}>{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PdfShareSheet;
