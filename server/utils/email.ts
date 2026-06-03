import nodemailer from 'nodemailer';

/**
 * Sends a notification email to the administrator when any form is filled.
 * @param formType Type of form (e.g. 'volunteer', 'contact', 'donation', 'admission', etc.)
 * @param formData Key-value pair of the form fields filled by the user.
 */
export const sendNotificationEmail = async (formType: string, formData: Record<string, any>) => {
  const targetEmail = 'croping@gmail.com';
  const formspreeUrl = 'https://formspree.io/f/mdavnpan';

  // Flatten and format keys for the Formspree payload
  const payload: Record<string, any> = { "Submission Type": formType };
  for (const [key, value] of Object.entries(formData)) {
    // Format keys (e.g. donorName -> Donor Name)
    const formattedKey = key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
    
    if (value && typeof value === 'object') {
      if (Array.isArray(value)) {
        payload[formattedKey] = value.join(', ');
      } else {
        payload[formattedKey] = JSON.stringify(value);
      }
    } else {
      payload[formattedKey] = value;
    }
  }

  console.log(`[Formspree Service] Form Type: ${formType}`);
  console.log(`[Formspree Service] Destination: ${targetEmail} via Formspree`);
  console.log(`[Formspree Service] Payload:`, payload);

  try {
    const response = await fetch(formspreeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const data = await response.json();
      console.log(`[Formspree Service] Email sent successfully via Formspree:`, data);
      return { success: true, message: 'Email sent successfully via Formspree' };
    } else {
      const errText = await response.text();
      console.error(`[Formspree Service] Error response from Formspree:`, errText);
      return { success: false, error: errText };
    }
  } catch (error: any) {
    console.error('[Formspree Service] Error occurred while sending to Formspree:', error);
    return { success: false, error: error.message };
  }
};
