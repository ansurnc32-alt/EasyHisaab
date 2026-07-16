import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageHeader from '../components/ui/PageHeader';
import Section from '../components/ui/Section';
import Container from '../components/ui/Container';
import PdfPaper from '../components/pdf/PdfPaper';
import PdfHeader from '../components/pdf/PdfHeader';
import PdfItemsTable from '../components/pdf/PdfItemsTable';
import PdfSummary from '../components/pdf/PdfSummary';
import PdfFooter from '../components/pdf/PdfFooter';
import PdfActionBar from '../components/pdf/PdfActionBar';
import PdfDownloadModal from '../components/pdf/PdfDownloadModal';
import PdfShareSheet from '../components/pdf/PdfShareSheet';
import PdfPrintDialog from '../components/pdf/PdfPrintDialog';
import { resolveVoiceCommand } from '../utils/voiceCommands';
import styles from './PdfPreviewPage.module.css';

const MOCK_INVOICE_DATA = {
  businessName: 'EasyHisaab Store',
  businessType: 'किराना दुकान (Kirana Store)',
  date: '16 जुलाई 2026',
  invoiceNumber: 'INV-2026-001',
  customerName: '', 
  items: [
    { name: 'आलू', quantity: '5', unit: 'kg', price: '30', amount: '150' },
    { name: 'प्याज', quantity: '2', unit: 'kg', price: '40', amount: '80' },
    { name: 'तेल', quantity: '1', unit: 'L', price: '180', amount: '180' }
  ],
  subtotal: '410',
  discount: '0',
  grandTotal: '410'
};

const PdfPreviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const transcript = location.state?.transcript || '';
  const voiceCommand = useMemo(() => resolveVoiceCommand(transcript), [transcript]);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showShareSheet, setShowShareSheet] = useState(false);
  const [showPrintDialog, setShowPrintDialog] = useState(false);

  useEffect(() => {
    if (!voiceCommand) {
      return;
    }

    if (voiceCommand.action?.name === 'download') {
      setShowDownloadModal(true);
    }

    if (voiceCommand.action?.name === 'print') {
      setShowPrintDialog(true);
    }

    if (voiceCommand.action?.name === 'share') {
      setShowShareSheet(true);
    }
  }, [voiceCommand]);

  return (
    <div className={styles.pageWrapper}>
      <Section className={styles.previewSection}>
        <Container>
          <PageHeader 
            title="बिल पूर्वावलोकन" 
            subtitle="डाउनलोड करने से पहले बिल देखें" 
          />
        </Container>
      </Section>

      <PdfPaper>
        <PdfHeader 
          businessName={MOCK_INVOICE_DATA.businessName}
          businessType={MOCK_INVOICE_DATA.businessType}
          date={MOCK_INVOICE_DATA.date}
          invoiceNumber={MOCK_INVOICE_DATA.invoiceNumber}
          customerName={MOCK_INVOICE_DATA.customerName}
        />
        <PdfItemsTable items={MOCK_INVOICE_DATA.items} showPrice={true} />
        <PdfSummary 
          subtotal={MOCK_INVOICE_DATA.subtotal}
          discount={MOCK_INVOICE_DATA.discount}
          grandTotal={MOCK_INVOICE_DATA.grandTotal}
        />
        <PdfFooter />
      </PdfPaper>

      <PdfActionBar
        onDownload={() => setShowDownloadModal(true)}
        onShare={() => setShowShareSheet(true)}
        onPrint={() => setShowPrintDialog(true)}
        onNewBill={() => navigate('/business-selection')}
      />
      <PdfDownloadModal isOpen={showDownloadModal} onClose={() => setShowDownloadModal(false)} />
      <PdfShareSheet isOpen={showShareSheet} onClose={() => setShowShareSheet(false)} />
      <PdfPrintDialog isOpen={showPrintDialog} onClose={() => setShowPrintDialog(false)} />
    </div>
  );
};

export default PdfPreviewPage;
