export const formatPhoneNumber = (value: string): string => {
  // Remove all non-numeric characters
  const cleaned = value.replace(/\D/g, '');
  
  // Format as (XXX) XXX-XXXX
  if (cleaned.length >= 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  }
  
  // For partial numbers, format progressively
  if (cleaned.length > 3 && cleaned.length < 6) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  }
  if (cleaned.length >= 6) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  if (cleaned.length > 0) {
    return `(${cleaned}`;
  }
  
  return cleaned;
};

export const isValidPhoneNumber = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  console.log("Phone validation - Testing number:", {
    original: phone,
    cleaned,
    length: cleaned.length,
    isValid: cleaned.length === 10
  });
  return cleaned.length === 10;
};

export const validatePhoneNumber = (phone: string): string | null => {
  if (!phone) return null;
  if (!isValidPhoneNumber(phone)) {
    return "Please enter a valid 10-digit phone number";
  }
  return null;
};