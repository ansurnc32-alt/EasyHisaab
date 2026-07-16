import React, { useState } from 'react';
import PageHeader from '../components/ui/PageHeader';
import Section from '../components/ui/Section';
import Container from '../components/ui/Container';
import ReviewItemCard from '../components/review/ReviewItemCard';
import ReviewItemList from '../components/review/ReviewItemList';
import ReviewSummary from '../components/review/ReviewSummary';
import EmptyReviewState from '../components/review/EmptyReviewState';
import styles from './ReviewPage.module.css';

const MOCK_ITEMS = [
  { id: 1, name: 'आलू (Potato)', quantity: '5', unit: 'kg', price: '150' },
  { id: 2, name: 'प्याज (Onion)', quantity: '2', unit: 'kg', price: '80' },
  { id: 3, name: 'टमाटर (Tomato)', quantity: '1', unit: 'kg', price: '40' },
  { id: 4, name: 'हरी मिर्च (Green Chilli)', quantity: '250', unit: 'g', price: '20' }
];

const ReviewPage = () => {
  const [items, setItems] = useState(MOCK_ITEMS);

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
              किराना
            </div>
          </div>

          {items.length === 0 ? (
            <EmptyReviewState />
          ) : (
            <ReviewItemList>
              {items.map(item => (
                <ReviewItemCard
                  key={item.id}
                  name={item.name}
                  quantity={item.quantity}
                  unit={item.unit}
                  price={item.price}
                />
              ))}
            </ReviewItemList>
          )}

        </Container>
      </Section>

      <ReviewSummary 
        totalItems={items.length} 
        estimatedTotal={items.length > 0 ? "290.00" : "0.00"} 
      />
    </div>
  );
};

export default ReviewPage;
