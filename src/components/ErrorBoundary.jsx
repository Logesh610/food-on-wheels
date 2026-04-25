import React from 'react';
import Button from './Button';
import { AlertTriangle } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
          <div className="mb-6 p-6 bg-red-50 dark:bg-red-950/30 rounded-3xl text-red-500">
            <AlertTriangle size={56} />
          </div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">
            Something went wrong
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-2 max-w-md">
            An unexpected error occurred. We've logged the issue and will look into it.
          </p>
          <p className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl mb-8 max-w-md font-mono">
            {this.state.error?.message}
          </p>
          <Button variant="primary" onClick={() => { this.setState({ hasError: false }); window.location.href = '/'; }}>
            Go Back Home
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
