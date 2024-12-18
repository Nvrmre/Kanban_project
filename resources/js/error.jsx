import React, { Component } from "react";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state to show fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // Log the error to an error reporting service
        console.error("Error caught in error boundary:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <h1>Something went wrong with the drag-and-drop operation.</h1>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
