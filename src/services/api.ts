const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

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

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN PORTAL SERVICES
// ─────────────────────────────────────────────────────────────────────────────
const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export const checkAdminSetup = async () => {
  const response = await fetch(`${API_BASE_URL}/admin/check-setup`);
  return response.json();
};

export const setupAdmin = async (data: any) => {
  const response = await fetch(`${API_BASE_URL}/admin/setup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
};

export const loginAdmin = async (data: any) => {
  const response = await fetch(`${API_BASE_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
};

export const changeAdminPassword = async (data: any) => {
  const response = await fetch(`${API_BASE_URL}/admin/change-password`, {
    method: 'POST',
    headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
};

export const getAdminSubmissions = async () => {
  const response = await fetch(`${API_BASE_URL}/admin/submissions`, {
    headers: getAuthHeaders()
  });
  return response.json();
};

// ─────────────────────────────────────────────────────────────────────────────
// PROGRAMS
// ─────────────────────────────────────────────────────────────────────────────
export const getPrograms = async () => {
  const response = await fetch(`${API_BASE_URL}/admin/programs`);
  return response.json();
};

export const createProgram = async (data: any) => {
  const response = await fetch(`${API_BASE_URL}/admin/programs`, {
    method: 'POST',
    headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
};

export const updateProgram = async (id: string, data: any) => {
  const response = await fetch(`${API_BASE_URL}/admin/programs/${id}`, {
    method: 'PUT',
    headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
};

export const deleteProgram = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/admin/programs/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  return response.json();
};

// ─────────────────────────────────────────────────────────────────────────────
// CMS SITE CONTENT
// ─────────────────────────────────────────────────────────────────────────────
export const getSiteContent = async (sectionKey: string) => {
  const response = await fetch(`${API_BASE_URL}/admin/content/${sectionKey}`);
  return response.json();
};

export const updateSiteContent = async (sectionKey: string, data: any) => {
  const response = await fetch(`${API_BASE_URL}/admin/content/${sectionKey}`, {
    method: 'PUT',
    headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ data })
  });
  return response.json();
};

// ─────────────────────────────────────────────────────────────────────────────
// IMAGE UPLOAD
// ─────────────────────────────────────────────────────────────────────────────
export const uploadImage = async (file: File): Promise<{ success: boolean; url?: string; error?: string }> => {
  const formData = new FormData();
  formData.append('image', file);
  const response = await fetch(`${API_BASE_URL}/admin/upload-image`, {
    method: 'POST',
    headers: getAuthHeaders(), // no Content-Type — browser sets boundary automatically
    body: formData
  });
  return response.json();
};

// ─────────────────────────────────────────────────────────────────────────────
// GALLERY
// ─────────────────────────────────────────────────────────────────────────────
export const getGallery = async (section?: string) => {
  const url = section
    ? `${API_BASE_URL}/admin/gallery?section=${encodeURIComponent(section)}`
    : `${API_BASE_URL}/admin/gallery`;
  const response = await fetch(url);
  return response.json();
};

export const addGalleryImage = async (formData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/admin/gallery`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: formData
  });
  return response.json();
};

export const updateGalleryImage = async (id: string, data: any) => {
  const response = await fetch(`${API_BASE_URL}/admin/gallery/${id}`, {
    method: 'PUT',
    headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
};

export const deleteGalleryImage = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/admin/gallery/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  return response.json();
};
