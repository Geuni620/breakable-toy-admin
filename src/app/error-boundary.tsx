import * as React from "react";

type Props = {
  renderFallback: (error: Error, reset: () => void) => React.ReactNode;
};

interface State<ErrorType extends Error = Error> {
  error: ErrorType | null;
}

const initialState: State = {
  error: null,
};

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<Props>,
  State
> {
  state = initialState;

  static getDerivedStateFromError(error: Error) {
    console.log("getDerivedStateFromError", error);
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.log("componentDidCatch", error, info);
  }

  resetErrorBoundary = () => {
    this.setState(initialState);
  };

  render() {
    if (this.state.error !== null) {
      return this.props.renderFallback(
        this.state.error,
        this.resetErrorBoundary
      );
    }

    return this.props.children;
  }
}
