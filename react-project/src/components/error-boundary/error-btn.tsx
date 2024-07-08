import React from 'react';
import Button from '../ui/button/button';

interface ErrorBtnProps {}

interface ErrorBtnState {
  hasError: boolean;
}

class ErrorButton extends React.Component<ErrorBtnProps, ErrorBtnState> {
  constructor(props: ErrorBtnProps) {
    super(props);
    this.state = { hasError: false };
  }

  render() {
    const { hasError } = this.state;

    if (hasError) {
      throw new Error('You are getting an error');
    }

    const handleClick = () => {
      this.setState({ hasError: true });
    };

    return (
      <Button btnType="button" onClick={handleClick}>
        Error
      </Button>
    );
  }
}

export default ErrorButton;
