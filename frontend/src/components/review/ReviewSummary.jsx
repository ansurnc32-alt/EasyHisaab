import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../ui/Container';
import Button from '../ui/Button';
import styles from './ReviewSummary.module.css';

const ReviewSummary = ({ totalItems, estimatedTotal }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.stickyWrapper}>
      <Container>
        <div className={styles.summaryContent}>
          
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>कुल सामान</span>
              <span className={styles.statValue}>{totalItems}</span>
            </div>
            <div className={styles.statItem} style={{ textAlign: 'right' }}>
              <span className={styles.statLabel}>अनुमानित राशि</span>
              <span className={`${styles.statValue} ${styles.totalValue}`}>₹{estimatedTotal}</span>
            </div>
          </div>

          <div className={styles.actions}>
            <Button variant="outline" onClick={() => navigate('/voice')}>
              वापस
            </Button>
            <Button onClick={() => navigate('/pdf')}>
              PDF बनाएं
            </Button>
          </div>

        </div>
      </Container>
    </div>
  );
};

export default ReviewSummary;
