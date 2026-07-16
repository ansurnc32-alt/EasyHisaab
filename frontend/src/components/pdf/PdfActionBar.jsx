import React, { useState } from 'react';
import { Download, Share2, Printer, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Container from '../ui/Container';
import Button from '../ui/Button';
import PdfDownloadModal from './PdfDownloadModal';
import PdfShareSheet from './PdfShareSheet';
import PdfPrintDialog from './PdfPrintDialog';
import styles from './PdfActionBar.module.css';

const PdfActionBar = () => {
  const navigate = useNavigate();
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showShareSheet, setShowShareSheet] = useState(false);
  const [showPrintDialog, setShowPrintDialog] = useState(false);

  return (
    <>
      <div className={styles.actionBarWrapper}>
        <Container>
          <div className={styles.actions}>
            <div className={styles.primaryActions}>
              <Button variant="outline" onClick={() => setShowPrintDialog(true)} className={styles.actionButton}>
                <Printer size={18} />
                <span>प्रिंट करें</span>
              </Button>
              <Button variant="outline" onClick={() => setShowShareSheet(true)} className={styles.actionButton}>
                <Share2 size={18} />
                <span>शेयर करें</span>
              </Button>
              <Button variant="outline" onClick={() => setShowDownloadModal(true)} className={styles.actionButton}>
                <Download size={18} />
                <span>डाउनलोड PDF</span>
              </Button>
              <Button onClick={() => navigate('/business-selection')} className={styles.actionButton}>
                <Plus size={18} />
                <span>नया बिल</span>
              </Button>
            </div>
          </div>
        </Container>
      </div>

      <PdfDownloadModal isOpen={showDownloadModal} onClose={() => setShowDownloadModal(false)} />
      <PdfShareSheet isOpen={showShareSheet} onClose={() => setShowShareSheet(false)} />
      <PdfPrintDialog isOpen={showPrintDialog} onClose={() => setShowPrintDialog(false)} />
    </>
  );
};

export default PdfActionBar;
