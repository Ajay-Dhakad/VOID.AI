import React from 'react';

interface ErrorProps {
    error?: Error;
    reset?: () => void;
}

const ErrorPage: React.FC<ErrorProps> = ({ error, reset }) => {
    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Something went wrong</h1>
            <p>{error?.message || 'An unexpected error has occurred.'}</p>
            {reset && (
                <button onClick={reset} style={{ marginTop: '1rem' }}>
                    Try Again
                </button>
            )}
        </div>
    );
};

export default ErrorPage;