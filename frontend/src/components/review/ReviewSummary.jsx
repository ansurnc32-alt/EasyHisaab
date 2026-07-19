import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { normalizeBusinessType } from '../../utils/businessType';
import styles from './ReviewSummary.module.css';

const ReviewSummary = ({ totalItems, estimatedTotal, items, customerName, businessType: propBusinessType, transcript }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const businessType = normalizeBusinessType(propBusinessType || location.state?.businessType || 'grocery');

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
            <Button variant="outline" onClick={() => navigate('/voice', { state: { businessType } })}>
              वापस
            </Button>
            <Button onClick={() => navigate('/pdf', { state: { items, customerName, businessType, estimatedTotal, transcript } })}>
              PDF बनाएं
            </Button>
          </div>

        </div>
      </Container>
    </div>
  );
};

export default ReviewSummary;
