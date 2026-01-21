// API service functions - separated network layer

export const saveLead = async (leadData) => {
  const response = await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...leadData,
      timestamp: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to save lead');
  }

  return response.json();
};

export const sendConfirmationEmail = async (email, name, productName, finalPrice) => {
  const response = await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: email,
      subject: `Thanks for your interest in ${productName}!`,
      body: `Hi ${name},\n\nThank you for your interest. Your final price is $${finalPrice.toFixed(2)}.\n\nWe'll be in touch soon!`,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to send email');
  }

  return response.json();
};
