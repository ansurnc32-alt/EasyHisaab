import React from 'react';
import { Link } from 'react-router-dom';

const PdfPreviewPage = () => {
  return (
    <div className="placeholder-page">
      <h2>PDF Preview</h2>
      <p>Your document is ready. You can download or share it.</p>
      <Link to="/" className="button">Back to Home</Link>
    </div>
  );
};

export default PdfPreviewPage;
