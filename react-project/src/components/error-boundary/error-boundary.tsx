import React from 'react';
import Button from '../ui/button/button';
import styles from './error-boundary.module.css';

interface ErrorBoundaryProps {
  fallback?: React.ReactNode;
  children?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error('Error occurred:', error);
    console.error('Component stack:', info.componentStack);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <h2>Ooops... You are getting an error</h2>
          <Button btnType="button" to="/React-2024Q3/?page=1">
            Back
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
