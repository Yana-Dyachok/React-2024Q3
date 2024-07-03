import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  fallback?: ReactNode;
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Error occurred:', error);
    console.error('Component stack:', info.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback || <p>Oops, something's wrong</p>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
