import * as React from "react";

interface RenderFallbackProps {
  error: Error;
  reset: () => void;
}

type Props = {
  renderFallback: (props: RenderFallbackProps) => React.ReactNode;
};

interface State {
  error: Error | null;
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
    console.log("error reset");
    this.setState(initialState);
  };

  render() {
    if (this.state.error !== null) {
      return this.props.renderFallback({
        error: this.state.error,
        reset: this.resetErrorBoundary,
      });
    }

    return this.props.children;
  }
}
