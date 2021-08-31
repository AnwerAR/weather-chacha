import React from 'react';
import PT from 'prop-types';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            // error: null,
            // errorInfo: null
        };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        this.state = { hasError: true, error, errorInfo };
    }

    render() {
        const { hasError } = this.state;
        const { children } = this.props;

        if (hasError) {
            return (
                <h1>Something went wrong.</h1>
            );
        }

        return children;
    }
}

ErrorBoundary.defaultProps = {
    children: null,
};

ErrorBoundary.propTypes = {
    children: PT.node,
};

ErrorBoundary.displayName = 'blocks/ErrorBoundary';
