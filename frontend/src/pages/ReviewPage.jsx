import React from 'react';
import { Link } from 'react-router-dom';

const ReviewPage = () => {
  return (
    <div className="placeholder-page">
      <h2>Review Generated Items</h2>
      <p>Review the items extracted from your voice input before finalizing.</p>
      <Link to="/pdf" className="button">Generate PDF</Link>
    </div>
  );
};

export default ReviewPage;
