import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    errorInfo: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    state: State = {
        hasError: false,
        errorInfo: null
    };

    static getDerivedStateFromError(e: Error): State {
        return { hasError: true, errorInfo: e };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {

        return (
            <>
                {this.state.hasError && <div className='overlay'>Something went wrong.</div> }
                {this.props.children}
            </>
        )
    }
}

export default ErrorBoundary;