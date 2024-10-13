import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = () => {
  return (
    <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Spinner animation="border" variant="warning" />
    </div>
  );
};

export default LoadingSpinner;
