import React, { useState } from 'react';
import Button from '../ui/button/button';

const ErrorButton: React.FC = () => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    throw new Error('You are getting an error');
  }

  const handleClick = () => {
    setHasError(true);
  };

  return (
    <Button btnType="button" onClick={handleClick}>
      Error
    </Button>
  );
};

export default ErrorButton;
