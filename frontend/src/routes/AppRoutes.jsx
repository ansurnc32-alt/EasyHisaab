import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import LandingPage from '../pages/LandingPage';
import BusinessSelectionPage from '../pages/BusinessSelectionPage';
import VoiceRecordingPage from '../pages/VoiceRecordingPage';
import ReviewPage from '../pages/ReviewPage';
import PdfPreviewPage from '../pages/PdfPreviewPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="business-selection" element={<BusinessSelectionPage />} />
          <Route path="voice" element={<ProtectedRoute><VoiceRecordingPage /></ProtectedRoute>} />
          <Route path="review" element={<ProtectedRoute><ReviewPage /></ProtectedRoute>} />
          <Route path="pdf" element={<ProtectedRoute><PdfPreviewPage /></ProtectedRoute>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
