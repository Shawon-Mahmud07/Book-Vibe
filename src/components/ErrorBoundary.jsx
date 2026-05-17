import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Something went wrong
          </h1>
          <p className="text-muted-foreground mb-6">
            Please refresh the page and try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-foreground text-background rounded-xl font-semibold hover:bg-foreground/90 transition"
          >
            Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
