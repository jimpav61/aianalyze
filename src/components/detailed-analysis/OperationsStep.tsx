import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { createHandlers } from "./utils/dropdownHandlers";
import { ServiceChannelsSection } from "./operations/ServiceChannelsSection";
import { InteractionsSection } from "./operations/InteractionsSection";
import { ToolsSection } from "./operations/ToolsSection";
import { PainPointsSection } from "./operations/PainPointsSection";

interface OperationsStepProps {
  formData: {
    serviceChannels: string;
    monthlyInteractions: string;
    currentTools: string;
    painPoints: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  errors: { [key: string]: string };
}

export const OperationsStep = ({
  formData,
  handleInputChange,
  errors,
}: OperationsStepProps) => {
  const { toast } = useToast();
  const [selectedChannels, setSelectedChannels] = useState<string[]>(
    formData.serviceChannels ? formData.serviceChannels.split(', ') : []
  );
  const [selectedTools, setSelectedTools] = useState<string[]>(
    formData.currentTools ? formData.currentTools.split(', ') : []
  );
  const [selectedPainPoints, setSelectedPainPoints] = useState<string[]>(
    formData.painPoints ? formData.painPoints.split(', ') : []
  );

  const { handleMonthlyInteractionsChange } = createHandlers(handleInputChange);

  const handleChannelChange = (channel: string, checked: boolean) => {
    const updatedChannels = checked
      ? [...selectedChannels, channel]
      : selectedChannels.filter((c) => c !== channel);
    
    setSelectedChannels(updatedChannels);
    
    handleInputChange({
      target: {
        name: 'serviceChannels',
        value: updatedChannels.join(', ')
      }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleToolChange = (tool: string, checked: boolean) => {
    const updatedTools = checked
      ? [...selectedTools, tool]
      : selectedTools.filter((t) => t !== tool);
    
    setSelectedTools(updatedTools);
    
    handleInputChange({
      target: {
        name: 'currentTools',
        value: updatedTools.join(', ')
      }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handlePainPointChange = (painPoint: string, checked: boolean) => {
    const updatedPainPoints = checked
      ? [...selectedPainPoints, painPoint]
      : selectedPainPoints.filter((p) => p !== painPoint);
    
    setSelectedPainPoints(updatedPainPoints);
    
    handleInputChange({
      target: {
        name: 'painPoints',
        value: updatedPainPoints.join(', ')
      }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="space-y-8 bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Current Operations</h3>
        <p className="text-sm text-gray-600">Help us understand your current service operations:</p>
      </div>

      <div className="space-y-8">
        <div>
          <h4 className="text-base font-medium text-gray-900 mb-2">
            Question 1: Which channels do you use to provide customer service? <span className="text-red-500">*</span>
          </h4>
          <ServiceChannelsSection
            selectedChannels={selectedChannels}
            handleChannelChange={handleChannelChange}
            error={errors.serviceChannels}
          />
        </div>

        <div>
          <h4 className="text-base font-medium text-gray-900 mb-2">
            Question 2: How many customer interactions do you handle monthly? <span className="text-red-500">*</span>
          </h4>
          <InteractionsSection
            monthlyInteractions={formData.monthlyInteractions}
            handleMonthlyInteractionsChange={handleMonthlyInteractionsChange}
            error={errors.monthlyInteractions}
          />
        </div>

        <div>
          <h4 className="text-base font-medium text-gray-900 mb-2">
            Question 3: What tools do you currently use? <span className="text-red-500">*</span>
          </h4>
          <ToolsSection
            selectedTools={selectedTools}
            handleToolChange={handleToolChange}
            error={errors.currentTools}
          />
        </div>

        <div>
          <h4 className="text-base font-medium text-gray-900 mb-2">
            Question 4: What are your main operational challenges? <span className="text-red-500">*</span>
          </h4>
          <PainPointsSection
            selectedPainPoints={selectedPainPoints}
            handlePainPointChange={handlePainPointChange}
            error={errors.painPoints}
          />
        </div>
      </div>
    </div>
  );
};