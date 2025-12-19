import React from 'react';
import PropTypes from 'prop-types';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.handleReset);
      }

      return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
          <div className="max-w-md w-full">
            <div className="bg-gray-800 rounded-2xl p-8 border border-red-500/30 shadow-2xl">
              <div className="flex justify-center mb-6">
                <div className="bg-red-500/20 rounded-full p-4">
                  <AlertTriangle className="w-16 h-16 text-red-500" aria-hidden="true" />
                </div>
              </div>
              
              <h1 className="text-2xl font-bold text-white text-center mb-2">
                Oops! Something went wrong
              </h1>
              
              <p className="text-gray-400 text-center mb-6">
                {this.props.errorMessage || 'An unexpected error occurred. Please try refreshing the page.'}
              </p>

              {import.meta.env.DEV && this.state.error && (
                <details className="mb-6 bg-gray-900 rounded-lg p-4 text-xs">
                  <summary className="text-red-400 cursor-pointer font-semibold mb-2">
                    Error Details (Development Only)
                  </summary>
                  <pre className="text-red-300 whitespace-pre-wrap overflow-auto">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={this.handleReset}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Try again"
                >
                  <RefreshCw className="w-5 h-5" aria-hidden="true" />
                  <span>Try Again</span>
                </button>
                
                <Link
                  to="/"
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  aria-label="Go to homepage"
                >
                  <Home className="w-5 h-5" aria-hidden="true" />
                  <span>Go Home</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.func,
  errorMessage: PropTypes.string,
  onError: PropTypes.func,
  onReset: PropTypes.func
};

export default ErrorBoundary;
