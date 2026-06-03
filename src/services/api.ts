const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const submitVolunteer = async (data: any) => {
  const response = await fetch(`${API_BASE_URL}/volunteers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
};

export const submitContact = async (data: any) => {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
};

export const submitDonationNotify = async (data: any) => {
  const response = await fetch(`${API_BASE_URL}/donations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
};

export const submitGeneralForm = async (formType: string, data: any) => {
  const response = await fetch(`${API_BASE_URL}/submit-general`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ formType, data })
  });
  return response.json();
};
