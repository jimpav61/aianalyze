import { useState } from "react";
import { createHandlers } from "./utils/dropdownHandlers";
import { ServiceChannelsSection } from "./operations/ServiceChannelsSection";
import { MonthlyInteractionsSection } from "./operations/MonthlyInteractionsSection";
import { CurrentToolsSection } from "./operations/CurrentToolsSection";
import { PainPointsSection } from "./operations/PainPointsSection";

interface OperationsStepProps {
  formData: {
    serviceChannels: string;
    monthlyInteractions: string;
    currentTools: string;
    painPoints: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const OperationsStep = ({
  formData,
  handleInputChange,
}: OperationsStepProps) => {
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
    <div className="space-y-4">
      <ServiceChannelsSection
        selectedChannels={selectedChannels}
        onChannelChange={handleChannelChange}
      />
      
      <MonthlyInteractionsSection
        value={formData.monthlyInteractions}
        onChange={handleMonthlyInteractionsChange}
      />
      
      <CurrentToolsSection
        selectedTools={selectedTools}
        onToolChange={handleToolChange}
      />
      
      <PainPointsSection
        selectedPainPoints={selectedPainPoints}
        onPainPointChange={handlePainPointChange}
      />
    </div>
  );
};