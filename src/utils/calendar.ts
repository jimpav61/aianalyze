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
    a1?: string;
    phone?: string; // Added phone field
  };
}

export const createCalendlyPrefill = (formData?: FormData): CalendlyPrefill | Record<string, never> => {
  if (!formData) {
    console.log("createCalendlyPrefill - No form data provided");
    return {};
  }

  const prefill = {
    name: formData.companyName || '',
    email: formData.email || '',
    customAnswers: {
      phone: formData.phoneNumber || '' // Map to 'phone' instead of 'a1'
    }
  };

  console.log("createCalendlyPrefill - Created prefill with phone:", {
    input: formData.phoneNumber,
    output: prefill.customAnswers.phone,
    fullPrefill: prefill
  });
  
  return prefill;
};