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
    a1?: string; // This specific field ID matches your Calendly event type
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
      a1: formData.phoneNumber || '' // Explicitly mapping to a1 field
    }
  };

  console.log("createCalendlyPrefill - Created prefill object:", {
    input: formData,
    output: prefill,
    phoneMapping: {
      from: formData.phoneNumber,
      to: 'a1',
      value: prefill.customAnswers.a1
    }
  });
  
  return prefill;
};