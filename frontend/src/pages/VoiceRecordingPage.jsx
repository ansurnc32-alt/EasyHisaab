import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Square } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import useSpeechRecognition from '../hooks/useSpeechRecognition';
import { normalizeBusinessType, getBusinessTypeLabel } from '../utils/businessType';
import styles from './VoiceRecordingPage.module.css';

const VoiceRecordingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [waveHeights, setWaveHeights] = useState(Array(15).fill(10));
  const [hasTranscript, setHasTranscript] = useState(false);
  const businessType = normalizeBusinessType(location.state?.businessType || 'grocery');
  const {
    startListening,
    stopListening,
    transcript,
    listening,
    error,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    let interval;
    if (listening) {
      interval = setInterval(() => {
        setWaveHeights((prev) => prev.map(() => 10 + Math.random() * 40));
      }, 100);
    } else {
      setWaveHeights(Array(15).fill(10));
    }
    return () => clearInterval(interval);
  }, [listening]);

  useEffect(() => {
    if (transcript.trim()) {
      setHasTranscript(true);
    } else if (!listening) {
      setHasTranscript(false);
    }
  }, [listening, transcript]);

  const handleTap = () => {
    if (!browserSupportsSpeechRecognition) {
      return;
    }

    if (listening) {
      stopListening();
      return;
    }

    if (transcript.trim()) {
      navigate('/review', {
        state: {
          transcript,
          businessType,
        },
      });
      return;
    }

    resetTranscript();
    setHasTranscript(false);
    startListening();
  };

  const getTitle = () => {
    if (error) {
      return 'आवाज़ पहचान में समस्या';
    }

    if (listening) {
      return 'हम सुन रहे हैं...';
    }

    if (transcript.trim()) {
      return 'तैयार है!';
    }

    return 'आइटम्स बताएं';
  };

  const getSubtitle = () => {
    if (error) {
      return error;
    }

    if (listening) {
      return 'रुकने के लिए दोबारा टैप करें';
    }

    if (transcript.trim()) {
      return 'कंटिन्यू पर टैप करके जारी रखें';
    }

    return 'माइक पर टैप करें और बोलना शुरू करें';
  };

  const isListening = listening;
  const showContinueButton = hasTranscript && transcript.trim() && !listening;
  const buttonLabel = useMemo(() => {
    if (!browserSupportsSpeechRecognition) {
      return 'Start recording';
    }

    if (listening) {
      return 'Stop recording';
    }

    if (showContinueButton) {
      return 'Continue';
    }

    return 'Start recording';
  }, [browserSupportsSpeechRecognition, listening, showContinueButton]);

  return (
    <div className={`${styles.container} ${isListening ? styles.containerListening : ''}`}>
      <motion.div
        className={`${styles.overlay} ${isListening ? styles.overlayListening : ''}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isListening ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      />

      <div className={styles.content}>
        <div className={styles.textContainer}>
          <AnimatePresence mode="wait">
            <motion.div
              key={isListening ? 'listening' : transcript.trim() ? 'completed' : 'idle'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className={`${styles.title} ${isListening ? styles.titleListening : ''}`}>
                {getTitle()}
              </h1>
              <p className={`${styles.subtitle} ${isListening ? styles.subtitleListening : ''}`}>
                {getSubtitle()}
              </p>
              <p className={styles.businessModeLabel}>{getBusinessTypeLabel(businessType)}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={styles.micWrapper}>
          <AnimatePresence>
            {!isListening && (
              <>
                <motion.div
                  className={`${styles.ring} ${styles.ring1}`}
                  animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                />
                <motion.div
                  className={`${styles.ring} ${styles.ring2}`}
                  animate={{ scale: [1, 1.05, 1], rotate: [0, 90, 0] }}
                  transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                />
                <motion.div
                  className={`${styles.ring} ${styles.ring3}`}
                  animate={{ scale: [1, 1.02, 1], opacity: [0.1, 0.2, 0.1] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1 }}
                />
              </>
            )}

            {isListening && (
              <>
                <motion.div
                  className={`${styles.ring} ${styles.ring1}`}
                  style={{ borderColor: 'rgba(239, 68, 68, 0.4)' }}
                  animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeOut' }}
                />
                <motion.div
                  className={`${styles.ring} ${styles.ring2}`}
                  style={{ borderColor: 'rgba(239, 68, 68, 0.2)', borderStyle: 'solid' }}
                  animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeOut', delay: 0.5 }}
                />
                <motion.div
                  className={`${styles.ring} ${styles.ring3}`}
                  style={{ borderColor: 'rgba(239, 68, 68, 0.1)' }}
                  animate={{ scale: [1, 2.5], opacity: [0.2, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeOut', delay: 1 }}
                />
              </>
            )}
          </AnimatePresence>

          <motion.button
            onClick={handleTap}
            whileTap={{ scale: 0.9 }}
            className={`
              ${styles.micButton}
              ${!isListening ? styles.micButtonIdle : ''}
              ${isListening ? styles.micButtonListening : ''}
            `}
            aria-label={buttonLabel}
            aria-pressed={isListening}
          >
            <AnimatePresence mode="wait">
              {!isListening && (
                <motion.div
                  key="idle"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Mic size={40} />
                </motion.div>
              )}
              {isListening && (
                <motion.div
                  key="listening"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Square size={32} fill="currentColor" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        <div className={`${styles.waveformContainer} ${isListening ? styles.waveformVisible : ''}`}>
          {waveHeights.map((height, i) => (
            <motion.div
              key={i}
              className={styles.waveBar}
              animate={{ height: `${height}px` }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />
          ))}
        </div>

        <div className={styles.transcriptCard} role="status" aria-live="polite">
          <div className={styles.transcriptHeader}>आपने कहा</div>
          <p className={styles.transcriptText}>
            {transcript.trim() ? transcript : 'बोलना शुरू करें...'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoiceRecordingPage;
