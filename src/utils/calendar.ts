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
    a1?: string; // This is the field Calendly expects for phone numbers
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
      a1: formData.phoneNumber || '' // Map phoneNumber to a1 field for Calendly
    }
  };

  console.log("createCalendlyPrefill - Created prefill with phone:", {
    input: formData.phoneNumber,
    output: prefill.customAnswers.a1,
    fullPrefill: prefill
  });
  
  return prefill;
};