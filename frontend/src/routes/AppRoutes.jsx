import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import LandingPage from '../pages/LandingPage';
import BusinessSelectionPage from '../pages/BusinessSelectionPage';
import VoiceRecordingPage from '../pages/VoiceRecordingPage';
import ReviewPage from '../pages/ReviewPage';
import PdfPreviewPage from '../pages/PdfPreviewPage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="business-selection" element={<BusinessSelectionPage />} />
          <Route path="voice" element={<VoiceRecordingPage />} />
          <Route path="review" element={<ReviewPage />} />
          <Route path="pdf" element={<PdfPreviewPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
