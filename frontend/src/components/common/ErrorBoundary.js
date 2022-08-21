import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className="container">
        <h2 className="text-center mt-4">Что-то пошло не так...</h2>
        <p className="text-center">Мы уже работаем над решением проблемы.</p>
      </div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary
