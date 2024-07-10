import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    return hasError ? <div>500</div> : children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ErrorBoundary };
