import React from 'react';
import BusinessGrid from './BusinessGrid';
import BusinessCard from './BusinessCard';
import styles from './PopularBusinesses.module.css';

const PopularBusinesses = ({ businesses, selectedId, onSelect }) => {
  return (
    <div>
      <h3 className={styles.title}>लोकप्रिय व्यवसाय</h3>
      <BusinessGrid>
        {businesses.map((business) => (
          <BusinessCard
            key={business.id}
            icon={business.icon}
            title={business.title}
            description={business.description}
            isSelected={selectedId === business.id}
            onClick={() => onSelect(business.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelect(business.id);
              }
            }}
          />
        ))}
      </BusinessGrid>
    </div>
  );
};

export default PopularBusinesses;
