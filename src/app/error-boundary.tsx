import * as React from "react";
import { isDifferentArray } from "@/lib/utils";

interface RenderFallbackProps {
  error: Error;
  reset: () => void;
}

type Props = {
  renderFallback: (props: RenderFallbackProps) => React.ReactNode;
  resetKeys?: unknown[];
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

  componentDidUpdate(prevProps: Props) {
    if (this.state.error == null) {
      return;
    }

    if (isDifferentArray(prevProps.resetKeys, this.props.resetKeys)) {
      this.resetErrorBoundary();
    }
  }
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
