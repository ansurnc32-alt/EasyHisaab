import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Store, Utensils, Scissors, Coffee, Apple, 
  Pill, Zap, Wrench, Armchair, Hammer, 
  Croissant, Milk, PenTool, Shirt, Smartphone, 
  Tractor, Plus
} from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Section from '../components/ui/Section';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import PopularBusinesses from '../components/business/PopularBusinesses';
import SearchBusiness from '../components/business/SearchBusiness';
import BusinessGrid from '../components/business/BusinessGrid';
import BusinessCard from '../components/business/BusinessCard';
import styles from './BusinessSelectionPage.module.css';

const POPULAR_BUSINESSES = [
  { id: 'kirana', title: 'Kirana Store', description: 'किराना दुकान', icon: Store },
  { id: 'restaurant', title: 'Restaurant', description: 'रेस्टोरेंट', icon: Utensils },
  { id: 'tailor', title: 'Tail Shop', description: 'टेलर', icon: Scissors },
  { id: 'tea', title: 'Tea Stall', description: 'चाय की दुकान', icon: Coffee }
];

const ALL_BUSINESSES = [
  { id: 'general', title: 'General Store', description: 'जनरल स्टोर', icon: Store },
  { id: 'vegetable', title: 'Vegetable Shop', description: 'सब्जी की दुकान', icon: Apple },
  { id: 'fruit', title: 'Fruit Shop', description: 'फलों की दुकान', icon: Apple },
  { id: 'medical', title: 'Medical Store', description: 'मेडिकल स्टोर', icon: Pill },
  { id: 'electrician', title: 'Electrician', description: 'इलेक्ट्रीशियन', icon: Zap },
  { id: 'plumber', title: 'Plumber', description: 'प्लंबर', icon: Wrench },
  { id: 'furniture', title: 'Furniture Shop', description: 'फर्नीचर की दुकान', icon: Armchair },
  { id: 'hardware', title: 'Hardware Shop', description: 'हार्डवेयर की दुकान', icon: Hammer },
  { id: 'bakery', title: 'Bakery', description: 'बेकरी', icon: Croissant },
  { id: 'dairy', title: 'Dairy', description: 'डेयरी', icon: Milk },
  { id: 'stationery', title: 'Stationery', description: 'स्टेशनरी', icon: PenTool },
  { id: 'clothing', title: 'Clothing Shop', description: 'कपड़े की दुकान', icon: Shirt },
  { id: 'mobile', title: 'Mobile Shop', description: 'मोबाइल शॉप', icon: Smartphone },
  { id: 'farmer', title: 'Farmer', description: 'किसान', icon: Tractor },
  { id: 'catering', title: 'Catering', description: 'कैटरिंग', icon: Utensils }
];

const BusinessSelectionPage = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  const handleContinue = () => {
    if (selectedId) {
      navigate('/voice');
    }
  };

  const filteredBusinesses = ALL_BUSINESSES.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.description.includes(searchQuery)
  );

  return (
    <div className={styles.pageWrapper}>
      <Section style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <Container>
          <PageHeader 
            title="अपना व्यवसाय चुनें" 
            subtitle="जिस प्रकार का बिल बनाना है उसे चुनें" 
          />
          
          <div className={styles.searchSection}>
            <SearchBusiness value={searchQuery} onChange={setSearchQuery} />
          </div>

          {!searchQuery && (
            <div className={styles.gridSection}>
              <PopularBusinesses 
                businesses={POPULAR_BUSINESSES}
                selectedId={selectedId}
                onSelect={handleSelect}
              />
            </div>
          )}

          <div className={styles.gridSection}>
            {!searchQuery && <h3 style={{ fontSize: '1.5rem', color: '#0F766E', marginBottom: '1.5rem' }}>सभी व्यवसाय</h3>}
            <BusinessGrid>
              {filteredBusinesses.map((business) => (
                <BusinessCard
                  key={business.id}
                  icon={business.icon}
                  title={business.title}
                  description={business.description}
                  isSelected={selectedId === business.id}
                  onClick={() => handleSelect(business.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelect(business.id);
                    }
                  }}
                />
              ))}
              
              {!searchQuery && (
                <BusinessCard
                  icon={Plus}
                  title="अन्य व्यवसाय"
                  description="अपना व्यवसाय जोड़ें"
                  isSelected={selectedId === 'custom'}
                  onClick={() => handleSelect('custom')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelect('custom');
                    }
                  }}
                />
              )}
            </BusinessGrid>
          </div>
        </Container>
      </Section>

      <div className={styles.stickyFooter}>
        <Container style={{ textAlign: 'center' }}>
          <Button 
            size="lg" 
            style={{ minWidth: '300px', opacity: selectedId ? 1 : 0.5, pointerEvents: selectedId ? 'auto' : 'none' }}
            onClick={handleContinue}
            disabled={!selectedId}
            aria-disabled={!selectedId}
          >
            आगे बढ़ें
          </Button>
        </Container>
      </div>
    </div>
  );
};

export default BusinessSelectionPage;
