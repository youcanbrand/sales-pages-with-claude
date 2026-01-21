import React from 'react';

// Status message component - displays success/error messages

const StatusMessage = ({ status }) => {
  if (!status) return null;

  if (status === 'success') {
    return (
      <div className="alert alert-success">
        <strong>Success!</strong> Thank you for your interest. Check your email for confirmation.
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="alert alert-error">
        <strong>Error!</strong> Something went wrong. Please try again.
      </div>
    );
  }

  return null;
};

export default StatusMessage;
