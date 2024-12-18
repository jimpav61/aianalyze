import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatPhoneNumber, validatePhoneNumber } from "@/utils/phoneValidation";

interface ContactFieldsProps {
  email: string;
  phoneNumber: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ContactFields = ({ 
  email, 
  phoneNumber, 
  handleInputChange 
}: ContactFieldsProps) => {
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    console.log("Phone number input:", {
      raw: e.target.value,
      formatted: formattedValue,
      isValid: !validatePhoneNumber(formattedValue)
    });
    
    const event = {
      ...e,
      target: {
        ...e.target,
        name: 'phoneNumber',
        value: formattedValue
      }
    };
    handleInputChange(event);
  };

  const phoneError = validatePhoneNumber(phoneNumber);

  return (
    <>
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
          placeholder="your@email.com"
          className={!email ? "border-red-300" : ""}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder="(555) 123-4567"
          className={phoneError ? "border-red-300" : ""}
        />
        {phoneError && (
          <p className="text-sm text-red-500 mt-1">{phoneError}</p>
        )}
      </div>
    </>
  );
};