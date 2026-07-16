import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import IconButton from '../ui/IconButton';
import styles from './ReviewItemCard.module.css';

const ReviewItemCard = ({ name, quantity, unit, price }) => {
  return (
    <div className={styles.card} role="listitem">
      <div className={styles.content}>
        <h4 className={styles.itemName}>{name}</h4>
        <p className={styles.itemDetails}>
          {quantity} {unit} 
          {price && <span className={styles.price}> • ₹{price}</span>}
        </p>
      </div>
      <div className={styles.actions}>
        <IconButton aria-label="Edit item">
          <Edit2 size={18} />
        </IconButton>
        <IconButton aria-label="Delete item" style={{ color: '#EF4444', borderColor: '#FEE2E2', backgroundColor: '#FEF2F2' }}>
          <Trash2 size={18} />
        </IconButton>
      </div>
    </div>
  );
};

export default ReviewItemCard;
