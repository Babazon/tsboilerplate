import React from 'react';

interface IState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<{}, IState> {

  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  // @ts-ignore The parameter 'error' is not used, but it is useful to see the signature here
  public static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  // @ts-ignore The parameter 'info' is not used, but it is useful to see the signature here
  public componentDidCatch(error: any, info: any) {
    //
  }

  public render() {
    return this.props.children;
  }
}
