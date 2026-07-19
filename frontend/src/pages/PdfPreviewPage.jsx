import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import html2pdf from 'html2pdf.js';
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

const sanitizeItemName = (name = '', price = '') => {
  if (!name) return '';
  let clean = name.trim();

  // Remove bill/invoice terms (case-insensitive, as standalone words)
  clean = clean.replace(/\b(bill|invoice)\b/gi, '');
  clean = clean.replace(/(^|\s)(बिल)(\s|$)/g, ' ');

  // Remove common price patterns: @ ₹60, @ 60, ₹60, Rs 60, Rs. 60, @ Rs 60
  clean = clean.replace(/@?\s*(₹|Rs\.?|rupees?|rupee|रु)\s*\d+(\.\d+)?/gi, '');
  clean = clean.replace(/@\s*\d+(\.\d+)?/gi, '');

  // Remove exact trailing prices if matching the item price
  if (price) {
    const priceNum = Number(price);
    if (!isNaN(priceNum) && priceNum > 0) {
      const priceStr = priceNum.toString();
      const escPrice = priceStr.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(`(^|\\s)(₹|Rs\\.?|rupees?|rupee|रु)?\\s*${escPrice}(\\s|$)`, 'gi');
      clean = clean.replace(regex, ' ');
    }
  }

  // Clean excess spaces
  return clean.replace(/\s+/g, ' ').trim();
};

const PdfPreviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const paperRef = useRef(null);

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
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}${mm}${dd}`;
    const randomSeq = String(Math.floor(1 + Math.random() * 9999)).padStart(4, '0');
    return `EH-${dateStr}-${randomSeq}`;
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
      const priceVal = item.unitPrice ?? item.price;

      const sanitizedName = sanitizeItemName(item.name || item.item, priceVal);

      let formattedPrice = '';
      if (priceVal !== undefined && priceVal !== null && priceVal !== '') {
        const num = Number(priceVal);
        if (!isNaN(num)) {
          formattedPrice = num % 1 === 0 ? num.toFixed(0) : num.toFixed(2);
        }
      }

      let formattedAmount = '';
      if (formattedPrice !== '') {
        const calculatedAmount = Number(quantity) * Number(formattedPrice);
        if (!isNaN(calculatedAmount)) {
          formattedAmount = calculatedAmount % 1 === 0 ? calculatedAmount.toFixed(0) : calculatedAmount.toFixed(2);
        }
      }

      return {
        ...item,
        name: sanitizedName,
        quantity,
        price: formattedPrice,
        amount: formattedAmount,
      };
    });
  }, [items]);

  // Calculate subtotal and grandTotal dynamically
  const subtotal = useMemo(() => {
    return processedItems.reduce((sum, item) => {
      const amt = Number(item.amount);
      return sum + (isNaN(amt) || item.amount === '' ? 0 : amt);
    }, 0);
  }, [processedItems]);

  const discount = 0;
  const grandTotal = subtotal - discount;

  const formattedSubtotal = useMemo(() => {
    return subtotal % 1 === 0 ? subtotal.toFixed(0) : subtotal.toFixed(2);
  }, [subtotal]);

  const formattedGrandTotal = useMemo(() => {
    return grandTotal % 1 === 0 ? grandTotal.toFixed(0) : grandTotal.toFixed(2);
  }, [grandTotal]);

  const handleDownloadPdf = (formatOption) => {
    const element = paperRef.current;
    if (!element) return;

    let scale = 2;
    if (formatOption === 'high-quality') {
      scale = 3;
    } else if (formatOption === 'print-ready') {
      scale = 4;
    }

    const options = {
      margin: 0,
      filename: `${invoiceNumber}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: scale, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(options).from(element).save();
  };

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

      <PdfPaper ref={paperRef}>
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
      <PdfDownloadModal isOpen={showDownloadModal} onClose={() => setShowDownloadModal(false)} onDownload={handleDownloadPdf} />
      <PdfShareSheet isOpen={showShareSheet} onClose={() => setShowShareSheet(false)} />
      <PdfPrintDialog isOpen={showPrintDialog} onClose={() => setShowPrintDialog(false)} />
    </div>
  );
};

export default PdfPreviewPage;
