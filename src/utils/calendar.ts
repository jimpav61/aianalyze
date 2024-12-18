interface FormData {
  companyName?: string;
  email?: string;
  phoneNumber?: string;
  [key: string]: any;
}

interface CalendlyPrefill {
  name: string;
  email: string;
  customAnswers: {
    [key: string]: string; // Make this more flexible to handle any question ID
  };
}

export const createCalendlyPrefill = (formData?: FormData): CalendlyPrefill | Record<string, never> => {
  if (!formData) {
    console.log("createCalendlyPrefill - No form data provided");
    return {};
  }

  // Try multiple known Calendly phone field IDs
  const phoneFieldIds = ['a1', 'a2', 'a3', 'phone_number', 'phone'];
  const customAnswers: { [key: string]: string } = {};
  
  phoneFieldIds.forEach(id => {
    if (formData.phoneNumber) {
      customAnswers[id] = formData.phoneNumber;
    }
  });

  const prefill = {
    name: formData.companyName || '',
    email: formData.email || '',
    customAnswers
  };

  console.log("createCalendlyPrefill - Created prefill object:", {
    input: {
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      name: formData.companyName
    },
    output: prefill,
    customAnswers
  });
  
  return prefill;
};