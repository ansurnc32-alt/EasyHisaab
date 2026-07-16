import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import Section from '../components/ui/Section';
import Container from '../components/ui/Container';
import PdfPaper from '../components/pdf/PdfPaper';
import PdfHeader from '../components/pdf/PdfHeader';
import PdfItemsTable from '../components/pdf/PdfItemsTable';
import PdfSummary from '../components/pdf/PdfSummary';
import PdfFooter from '../components/pdf/PdfFooter';
import PdfActionBar from '../components/pdf/PdfActionBar';
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

      <PdfActionBar />
    </div>
  );
};

export default PdfPreviewPage;
