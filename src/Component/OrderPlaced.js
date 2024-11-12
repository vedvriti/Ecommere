import React from 'react';

const Success = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Order Placed Successfully!</h2>
      <p style={styles.message}>Thank you for shopping with us. Your order has been placed successfully.</p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
  },
  heading: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '10px',
  },
  message: {
    fontSize: '18px',
    color: '#666',
  },
};

export default Success;
