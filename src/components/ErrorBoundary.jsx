import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // You can log to an error reporting service here
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-primary p-6">
          <div className="max-w-md w-full glass-card p-8 rounded-xl border border-red-500/20">
            <div className="flex items-center gap-4 mb-4">
              <AlertTriangle className="text-red-500" size={32} />
              <h2 className="text-2xl font-bold text-text">Something went wrong</h2>
            </div>
            <p className="text-text-muted mb-6">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-accent text-primary rounded-lg hover:bg-accent/90 transition-colors flex items-center gap-2 font-mono"
              >
                <RefreshCw size={18} />
                Refresh Page
              </button>
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="px-4 py-2 bg-secondary text-text rounded-lg hover:bg-secondary/80 transition-colors font-mono border border-secondary/50"
              >
                Try Again
              </button>
            </div>
            {import.meta.env.DEV && this.state.error && (
              <details className="mt-6 p-4 bg-secondary/20 rounded-lg text-xs font-mono overflow-auto max-h-48">
                <summary className="cursor-pointer text-text-muted mb-2">Error Details</summary>
                <pre className="text-red-400 whitespace-pre-wrap">
                  {this.state.error.toString()}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
