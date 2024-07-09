import React, { useState, useEffect } from 'react';
import styles from './popup.module.css';

interface PopUpProps {
  text: string;
  duration?: number;
}

const PopUp: React.FC<PopUpProps> = ({ text, duration = 5000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [duration]);

  if (!isVisible) return null;

  return (
    <div className={styles.popup}>
      <div className={styles.popupBody}>
        <div className={styles.popupContent}>
          <p className={styles.popupText}>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
