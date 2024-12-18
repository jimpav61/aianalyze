interface FormData {
  companyName?: string;
  email?: string;
  phoneNumber?: string;
  [key: string]: any;
}

export const createCalendlyPrefill = (formData?: FormData) => {
  if (!formData) {
    console.log("createCalendlyPrefill - No form data provided");
    return {};
  }

  const prefill = {
    name: formData.companyName || '',
    email: formData.email || '',
    customAnswers: {
      a1: formData.phoneNumber || ''
    }
  };

  console.log("createCalendlyPrefill - Created prefill object:", prefill);
  return prefill;
};