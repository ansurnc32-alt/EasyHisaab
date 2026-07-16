import React from 'react';
import { Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Container from '../ui/Container';
import Button from '../ui/Button';
import IconButton from '../ui/IconButton';
import styles from './PdfActionBar.module.css';

const PdfActionBar = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.actionBarWrapper}>
      <Container>
        <div className={styles.actions}>
          <div className={styles.primaryActions}>
            <Button variant="outline" onClick={() => navigate('/review')}>
              वापस
            </Button>
            <Button onClick={() => {}}>
              डाउनलोड PDF
            </Button>
          </div>
          <IconButton className={styles.shareBtn} aria-label="Share PDF">
            <Share2 size={24} />
          </IconButton>
        </div>
      </Container>
    </div>
  );
};

export default PdfActionBar;
