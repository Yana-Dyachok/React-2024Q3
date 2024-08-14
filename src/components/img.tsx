import React, { useState } from 'react';

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
    <div>
      {imageUrl && (
        <img src={imageUrl} alt="Uploaded" width={100} height={100} />
      )}
    </div>
  );
};
export default ImagePreview;
