import React from 'react';
import styles from './img.module.scss';

const ImagePreview: React.FC<{ base64Image: string | null }> = ({
  base64Image,
}) => {
  return (
    <div className={styles.imgBlock}>
      {base64Image && (
        <img src={base64Image} alt="img-form" className={styles.img} />
      )}
    </div>
  );
};

export default ImagePreview;
