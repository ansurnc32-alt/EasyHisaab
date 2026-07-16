import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList } from 'lucide-react';
import Button from '../ui/Button';
import styles from './EmptyReviewState.module.css';

const EmptyReviewState = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <ClipboardList size={40} />
      </div>
      <h3 className={styles.title}>अभी कोई सामान नहीं मिला</h3>
      <p className={styles.subtitle}>दोबारा रिकॉर्ड करके देखें</p>
      <Button onClick={() => navigate('/voice')}>
        फिर से रिकॉर्ड करें
      </Button>
    </div>
  );
};

export default EmptyReviewState;
