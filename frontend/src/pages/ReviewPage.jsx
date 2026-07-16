import React, { useMemo, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageHeader from '../components/ui/PageHeader';
import Section from '../components/ui/Section';
import Container from '../components/ui/Container';
import ReviewItemCard from '../components/review/ReviewItemCard';
import ReviewItemList from '../components/review/ReviewItemList';
import ReviewSummary from '../components/review/ReviewSummary';
import EmptyReviewState from '../components/review/EmptyReviewState';
import { parseHindiTranscript } from '../utils/parseTranscript';
import { getBusinessTypeLabel, normalizeBusinessType } from '../utils/businessType';
import { resolveVoiceCommand } from '../utils/voiceCommands';
import styles from './ReviewPage.module.css';

const MOCK_ITEMS = [
  { id: 1, name: 'आलू (Potato)', quantity: '5', unit: 'kg', price: '150' },
  { id: 2, name: 'प्याज (Onion)', quantity: '2', unit: 'kg', price: '80' },
  { id: 3, name: 'टमाटर (Tomato)', quantity: '1', unit: 'kg', price: '40' },
  { id: 4, name: 'हरी मिर्च (Green Chilli)', quantity: '250', unit: 'g', price: '20' }
];

const ReviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const transcript = location.state?.transcript || '';
  const businessType = normalizeBusinessType(location.state?.businessType || 'grocery');
  const voiceCommand = useMemo(() => resolveVoiceCommand(transcript), [transcript]);
  const parsedResult = useMemo(() => parseHindiTranscript(transcript, businessType), [transcript, businessType]);
  const [items, setItems] = useState(MOCK_ITEMS);

  useEffect(() => {
    if (parsedResult.items.length > 0) {
      setItems(parsedResult.items);
    } else {
      setItems(MOCK_ITEMS);
    }
  }, [parsedResult.items]);

  const handleUpdateItem = (itemId, updates) => {
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== itemId) {
          return item;
        }

        const parsedQuantity = Number(updates.quantity ?? item.quantity ?? '1') || 1;
        const parsedUnitPrice = Number(updates.unitPrice ?? updates.price ?? item.unitPrice ?? item.price ?? 0) || 0;
        const amount = parsedQuantity * parsedUnitPrice;

        return {
          ...item,
          ...updates,
          name: updates.name ?? item.name ?? item.item ?? '',
          item: updates.name ?? item.item ?? item.name ?? '',
          quantity: updates.quantity ?? item.quantity ?? '1',
          unit: item.unit || 'किलो',
          unitPrice: String(parsedUnitPrice),
          price: String(parsedUnitPrice),
          amount,
          lineTotal: amount,
        };
      })
    );
  };

  const handleDeleteItem = (itemId) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== itemId));
  };

  const estimatedTotal = useMemo(() => {
    const total = items.reduce((sum, item) => sum + Number(item.amount ?? item.lineTotal ?? item.price ?? 0), 0);
    return total.toFixed(2);
  }, [items]);

  useEffect(() => {
    if (!voiceCommand) {
      return;
    }

    if (voiceCommand.action?.type === 'navigate') {
      if (voiceCommand.action.to === 'back') {
        navigate(-1);
      } else {
        navigate(voiceCommand.action.to, { state: { transcript, businessType } });
      }
      return;
    }
  }, [voiceCommand, transcript, businessType, navigate]);

  if (voiceCommand) {
    return null;
  }

  return (
    <div className={styles.pageWrapper}>
      <Section style={{ paddingTop: '40px', paddingBottom: '20px' }}>
        <Container>
          <PageHeader 
            title="बिल की जांच करें" 
            subtitle="बिल बनाने से पहले सभी सामान एक बार देख लें" 
          />
          
          <div className={styles.chipContainer}>
            <div className={styles.businessChip}>
              Business: {getBusinessTypeLabel(businessType)}
            </div>
            {parsedResult.customerName && (
              <div className={styles.customerChip}>
                ग्राहक: {parsedResult.customerName}
              </div>
            )}
          </div>

          {items.length === 0 ? (
            <EmptyReviewState />
          ) : (
            <ReviewItemList>
              {items.map(item => (
                <ReviewItemCard
                  key={item.id}
                  item={item}
                  onUpdateItem={handleUpdateItem}
                  onDeleteItem={handleDeleteItem}
                />
              ))}
            </ReviewItemList>
          )}

        </Container>
      </Section>

      <ReviewSummary 
        totalItems={items.length} 
        estimatedTotal={estimatedTotal} 
      />
    </div>
  );
};

export default ReviewPage;
