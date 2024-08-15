import React, { useState } from 'react';
import styles from './img.module.scss';
const ImagePreview: React.FC<{ file: File | null }> = ({ file }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  React.useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  return (
    <div className={styles.imgBlock}>
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Uploaded"
          width={300}
          height={400}
          className={styles.img}
        />
      )}
    </div>
  );
};
export default ImagePreview;
