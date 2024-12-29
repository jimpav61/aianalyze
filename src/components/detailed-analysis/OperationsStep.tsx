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
}

export const OperationsStep = ({
  formData,
  handleInputChange,
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

    if (updatedChannels.length === 0) {
      toast({
        title: "Required Field",
        description: "Please select at least one service channel",
        variant: "destructive",
      });
    }
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

    if (updatedTools.length === 0) {
      toast({
        title: "Required Field",
        description: "Please select at least one tool",
        variant: "destructive",
      });
    }
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

    if (updatedPainPoints.length === 0) {
      toast({
        title: "Required Field",
        description: "Please select at least one pain point",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8 bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
      <ServiceChannelsSection
        selectedChannels={selectedChannels}
        handleChannelChange={handleChannelChange}
      />
      
      <InteractionsSection
        monthlyInteractions={formData.monthlyInteractions}
        handleMonthlyInteractionsChange={handleMonthlyInteractionsChange}
      />
      
      <ToolsSection
        selectedTools={selectedTools}
        handleToolChange={handleToolChange}
      />
      
      <PainPointsSection
        selectedPainPoints={selectedPainPoints}
        handlePainPointChange={handlePainPointChange}
      />
    </div>
  );
};