import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validatePhoneNumber, formatPhoneNumber } from "@/utils/phoneValidation";

interface ContactFieldsProps {
  phoneNumber: string;
  email: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: { [key: string]: string };
}

export const ContactFields = ({
  phoneNumber,
  email,
  handleInputChange,
  errors,
}: ContactFieldsProps) => {
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    e.target.value = formattedNumber;
    handleInputChange(e);
  };

  const phoneError = validatePhoneNumber(phoneNumber);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="phoneNumber" className="text-gray-700">
          Phone Number <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder="(555) 555-5555"
          className={`bg-white ${phoneError || errors.phoneNumber ? 'border-red-500' : ''}`}
          required
        />
        {(phoneError || errors.phoneNumber) && (
          <p className="text-sm text-red-500 mt-1">{errors.phoneNumber || phoneError}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-700">
          Email Address <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={handleInputChange}
          placeholder="your@email.com"
          className={`bg-white ${errors.email ? 'border-red-500' : ''}`}
          required
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email}</p>
        )}
      </div>
    </div>
  );
};