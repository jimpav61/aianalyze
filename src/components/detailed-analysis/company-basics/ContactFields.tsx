import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatPhoneNumber, validatePhoneNumber } from "@/utils/phoneValidation";

interface ContactFieldsProps {
  phoneNumber: string;
  email: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ContactFields = ({
  phoneNumber,
  email,
  handleInputChange,
}: ContactFieldsProps) => {
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    console.log("Phone validation - Testing number:", {
      original: e.target.value,
      cleaned: formattedValue.replace(/\D/g, ''),
      length: formattedValue.replace(/\D/g, '').length,
      isValid: !validatePhoneNumber(formattedValue)
    });
    
    const event = {
      ...e,
      target: {
        ...e.target,
        name: e.target.name,
        value: formattedValue,
      },
    };
    handleInputChange(event);
  };

  const phoneError = validatePhoneNumber(phoneNumber);

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="phoneNumber" className="flex items-center">
          Phone Number <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder="(555) 555-5555"
          maxLength={14}
          className={!phoneNumber || phoneError ? "border-red-300" : ""}
        />
        {phoneError && (
          <p className="text-sm text-red-500 mt-1">{phoneError}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="flex items-center">
          Email <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={handleInputChange}
          placeholder="Enter your email"
          className={!email ? "border-red-300" : ""}
        />
      </div>
    </>
  );
};