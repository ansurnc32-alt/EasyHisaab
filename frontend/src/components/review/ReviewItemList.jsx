import React from 'react';
import styles from './ReviewItemList.module.css';

const ReviewItemList = ({ children }) => {
  return (
    <div className={styles.listContainer} role="list">
      {children}
    </div>
  );
};

export default ReviewItemList;
