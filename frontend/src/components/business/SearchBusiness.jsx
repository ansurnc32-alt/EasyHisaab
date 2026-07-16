import React from 'react';
import { Search } from 'lucide-react';
import styles from './SearchBusiness.module.css';

const SearchBusiness = ({ value, onChange }) => {
  return (
    <div className={styles.searchWrapper}>
      <Search className={styles.icon} size={24} />
      <input 
        type="text" 
        className={styles.input} 
        placeholder="व्यवसाय खोजें..." 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="व्यवसाय खोजें"
      />
    </div>
  );
};

export default SearchBusiness;
