import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Square, Loader2, Check } from 'lucide-react';
import styles from './VoiceRecordingPage.module.css';

const STATES = {
  IDLE: 'idle',
  LISTENING: 'listening',
  PROCESSING: 'processing',
  COMPLETED: 'completed'
};

const VoiceRecordingPage = () => {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState(STATES.IDLE);
  
  const [waveHeights, setWaveHeights] = useState(Array(15).fill(10));

  useEffect(() => {
    let interval;
    if (currentState === STATES.LISTENING) {
      interval = setInterval(() => {
        setWaveHeights(prev => prev.map(() => 10 + Math.random() * 40));
      }, 100);
    } else {
      setWaveHeights(Array(15).fill(10));
    }
    return () => clearInterval(interval);
  }, [currentState]);

  const handleTap = () => {
    if (currentState === STATES.IDLE) {
      setCurrentState(STATES.LISTENING);
    } else if (currentState === STATES.LISTENING) {
      setCurrentState(STATES.PROCESSING);
      setTimeout(() => {
        setCurrentState(STATES.COMPLETED);
        setTimeout(() => {
          navigate('/review');
        }, 1500);
      }, 2000);
    }
  };

  const getTitle = () => {
    switch(currentState) {
      case STATES.IDLE: return "आइटम्स बताएं";
      case STATES.LISTENING: return "हम सुन रहे हैं...";
      case STATES.PROCESSING: return "प्रोसेस किया जा रहा है";
      case STATES.COMPLETED: return "तैयार है!";
      default: return "";
    }
  };

  const getSubtitle = () => {
    switch(currentState) {
      case STATES.IDLE: return "माइक पर टैप करें और बोलना शुरू करें";
      case STATES.LISTENING: return "रुकने के लिए दोबारा टैप करें";
      case STATES.PROCESSING: return "कृपया प्रतीक्षा करें";
      case STATES.COMPLETED: return "आइटम्स को लिस्ट में बदला जा रहा है";
      default: return "";
    }
  };

  const isListening = currentState === STATES.LISTENING;

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
              key={currentState}
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
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={styles.micWrapper}>
          
          <AnimatePresence>
            {currentState === STATES.IDLE && (
              <>
                <motion.div 
                  className={`${styles.ring} ${styles.ring1}`}
                  animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                />
                <motion.div 
                  className={`${styles.ring} ${styles.ring2}`}
                  animate={{ scale: [1, 1.05, 1], rotate: [0, 90, 0] }}
                  transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                />
                <motion.div 
                  className={`${styles.ring} ${styles.ring3}`}
                  animate={{ scale: [1, 1.02, 1], opacity: [0.1, 0.2, 0.1] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                />
              </>
            )}
            
            {currentState === STATES.LISTENING && (
              <>
                <motion.div 
                  className={`${styles.ring} ${styles.ring1}`}
                  style={{ borderColor: 'rgba(239, 68, 68, 0.4)' }}
                  animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                />
                <motion.div 
                  className={`${styles.ring} ${styles.ring2}`}
                  style={{ borderColor: 'rgba(239, 68, 68, 0.2)', borderStyle: 'solid' }}
                  animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut", delay: 0.5 }}
                />
                <motion.div 
                  className={`${styles.ring} ${styles.ring3}`}
                  style={{ borderColor: 'rgba(239, 68, 68, 0.1)' }}
                  animate={{ scale: [1, 2.5], opacity: [0.2, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut", delay: 1 }}
                />
              </>
            )}
          </AnimatePresence>

          <motion.button
            onClick={handleTap}
            whileTap={{ scale: 0.9 }}
            className={`
              ${styles.micButton} 
              ${currentState === STATES.IDLE ? styles.micButtonIdle : ''}
              ${currentState === STATES.LISTENING ? styles.micButtonListening : ''}
              ${currentState === STATES.PROCESSING ? styles.micButtonProcessing : ''}
              ${currentState === STATES.COMPLETED ? styles.micButtonCompleted : ''}
            `}
            aria-label={isListening ? "Stop recording" : "Start recording"}
          >
            <AnimatePresence mode="wait">
              {currentState === STATES.IDLE && (
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
              {currentState === STATES.LISTENING && (
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
              {currentState === STATES.PROCESSING && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, rotate: 360 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 size={40} />
                </motion.div>
              )}
              {currentState === STATES.COMPLETED && (
                <motion.div
                  key="completed"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  <Check size={48} strokeWidth={3} />
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

      </div>
    </div>
  );
};

export default VoiceRecordingPage;
