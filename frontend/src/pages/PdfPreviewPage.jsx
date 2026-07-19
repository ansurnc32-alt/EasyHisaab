import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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

const PdfPreviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const state = location.state || {};
  const items = state.items;
  const customerName = state.customerName;
  const businessType = state.businessType || 'grocery';
  const transcript = state.transcript || '';

  // Redirect to review page if no bill data/items are present
  useEffect(() => {
    if (!state.items) {
      navigate('/review');
    }
  }, [state.items, navigate]);

  // Voice commands resolving
  const voiceCommand = useMemo(() => resolveVoiceCommand(transcript), [transcript]);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showShareSheet, setShowShareSheet] = useState(false);
  const [showPrintDialog, setShowPrintDialog] = useState(false);

  // Generate stable Date and Invoice Number on mount
  const [date] = useState(() => {
    return new Date().toLocaleDateString('hi-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  });

  const [invoiceNumber] = useState(() => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `INV-${new Date().getFullYear()}-${randomNum}`;
  });

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

  // Map items to standard format with formatted price and amount
  const processedItems = useMemo(() => {
    if (!items) return [];
    return items.map((item) => {
      const quantity = item.quantity || '1';

      let priceVal = item.unitPrice ?? item.price;
      let amountVal = item.amount ?? item.lineTotal;

      let formattedPrice = '';
      if (priceVal !== undefined && priceVal !== null && priceVal !== '') {
        const num = Number(priceVal);
        if (!isNaN(num)) {
          formattedPrice = num % 1 === 0 ? num.toFixed(0) : num.toFixed(2);
        }
      }

      let formattedAmount = '';
      if (amountVal !== undefined && amountVal !== null && amountVal !== '') {
        const num = Number(amountVal);
        if (!isNaN(num)) {
          formattedAmount = num % 1 === 0 ? num.toFixed(0) : num.toFixed(2);
        }
      }

      return {
        ...item,
        quantity,
        price: formattedPrice,
        amount: formattedAmount,
      };
    });
  }, [items]);

  // Calculate subtotal and grandTotal dynamically
  const subtotal = useMemo(() => {
    if (!items) return 0;
    return items.reduce((sum, item) => {
      const amtVal = item.amount ?? item.lineTotal ?? (Number(item.quantity || 1) * Number(item.unitPrice ?? item.price ?? 0));
      const amt = Number(amtVal);
      return sum + (isNaN(amt) || amtVal === null || amtVal === undefined || amtVal === '' ? 0 : amt);
    }, 0);
  }, [items]);

  const discount = 0;
  const grandTotal = subtotal - discount;

  const formattedSubtotal = useMemo(() => {
    return subtotal % 1 === 0 ? subtotal.toFixed(0) : subtotal.toFixed(2);
  }, [subtotal]);

  const formattedGrandTotal = useMemo(() => {
    return grandTotal % 1 === 0 ? grandTotal.toFixed(0) : grandTotal.toFixed(2);
  }, [grandTotal]);

  if (!state.items) {
    return null;
  }

  const businessName = user?.shopName || 'EasyHisaab Store';
  const displayBusinessType = businessType === 'rental' ? 'rental bill' : 'grocery bill';
  const displayCustomerName = customerName ? customerName.trim() : 'Walk-in Customer';

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
          businessName={businessName}
          businessType={displayBusinessType}
          date={date}
          invoiceNumber={invoiceNumber}
          customerName={displayCustomerName}
        />
        <PdfItemsTable items={processedItems} showPrice={true} />
        <PdfSummary 
          subtotal={formattedSubtotal}
          discount={discount}
          grandTotal={formattedGrandTotal}
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
