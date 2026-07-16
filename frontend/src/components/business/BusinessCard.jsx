import React from 'react';
import styles from './BusinessCard.module.css';

const BusinessCard = ({ icon: Icon, title, description, isSelected, onClick, onKeyDown }) => {
  return (
    <div 
      className={`${styles.card} ${isSelected ? styles.selected : ''}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      aria-label={`${title} business option`}
    >
      <div className={styles.iconWrapper}>
        <Icon size={32} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
};

export default BusinessCard;
