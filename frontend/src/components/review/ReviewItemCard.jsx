import React, { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import IconButton from '../ui/IconButton';
import Input from '../ui/Input';
import Button from '../ui/Button';
import styles from './ReviewItemCard.module.css';

const ReviewItemCard = ({ item, onUpdateItem, onDeleteItem }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState({
    name: item?.name || item?.item || '',
    quantity: item?.quantity || '1',
    unitPrice: item?.unitPrice ?? item?.price ?? '',
  });

  const handleStartEdit = () => {
    setDraft({
      name: item?.name || item?.item || '',
      quantity: item?.quantity || '1',
      unitPrice: item?.unitPrice ?? item?.price ?? '',
    });
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    const name = draft.name.trim();
    const quantity = draft.quantity.trim() || '1';
    const unitPrice = draft.unitPrice.trim();

    if (!name) {
      return;
    }

    const parsedQuantity = Number(quantity) || 1;
    const parsedUnitPrice = Number(unitPrice) || 0;
    const amount = parsedQuantity * parsedUnitPrice;

    onUpdateItem(item.id, {
      name,
      item: name,
      quantity,
      unitPrice,
      price: unitPrice,
      amount,
      lineTotal: amount,
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className={styles.card} role="listitem">
        <div className={styles.content}>
          <Input
            value={draft.name}
            onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))}
            placeholder="Item name"
            style={{ marginBottom: '8px' }}
          />
          <div style={{ display: 'flex', gap: '8px' }}>
            <Input
              type="number"
              value={draft.quantity}
              onChange={(event) => setDraft((current) => ({ ...current, quantity: event.target.value }))}
              placeholder="Quantity"
            />
            <Input
              type="number"
              value={draft.unitPrice}
              onChange={(event) => setDraft((current) => ({ ...current, unitPrice: event.target.value }))}
              placeholder="Unit price"
            />
          </div>
        </div>
        <div className={styles.actions}>
          <Button size="sm" onClick={handleSaveEdit}>Save</Button>
          <Button variant="outline" size="sm" onClick={handleCancelEdit}>Cancel</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card} role="listitem">
      <div className={styles.content}>
        <h4 className={styles.itemName}>{item?.name || item?.item || ''}</h4>
        <p className={styles.itemDetails}>
          {item?.quantity || '1'} {item?.unit || 'किलो'}
          {item?.price && <span className={styles.price}> • ₹{item.price}</span>}
        </p>
      </div>
      <div className={styles.actions}>
        <IconButton aria-label="Edit item" onClick={handleStartEdit}>
          <Edit2 size={18} />
        </IconButton>
        <IconButton aria-label="Delete item" onClick={() => onDeleteItem(item.id)} style={{ color: '#EF4444', borderColor: '#FEE2E2', backgroundColor: '#FEF2F2' }}>
          <Trash2 size={18} />
        </IconButton>
      </div>
    </div>
  );
};

export default ReviewItemCard;
