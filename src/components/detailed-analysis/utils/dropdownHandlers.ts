import { ChangeEvent } from 'react';
import { 
  objectiveOptions, 
  timelineOptions, 
  budgetOptions, 
  commonPainPoints,
  employeeCountOptions,
  revenueOptions,
  serviceChannelOptions,
  monthlyInteractionsOptions,
  crmToolOptions
} from '../constants/dropdownOptions';

export const createDropdownHandler = (
  name: string,
  options: Array<{ value: string; label: string }>,
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
) => {
  return (value: string) => {
    const selectedOption = options.find((opt) => opt.value === value);
    handleInputChange({
      target: { name, value: selectedOption?.label || "" },
    } as ChangeEvent<HTMLInputElement>);
  };
};

export const createHandlers = (
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
) => ({
  handleObjectiveChange: createDropdownHandler('objectives', objectiveOptions, handleInputChange),
  handleTimelineChange: createDropdownHandler('timeline', timelineOptions, handleInputChange),
  handleBudgetChange: createDropdownHandler('budget', budgetOptions, handleInputChange),
  handlePainPointChange: createDropdownHandler('painPoints', commonPainPoints, handleInputChange),
  handleEmployeeChange: createDropdownHandler('employees', employeeCountOptions, handleInputChange),
  handleRevenueChange: createDropdownHandler('revenue', revenueOptions, handleInputChange),
  handleServiceChannelsChange: createDropdownHandler('serviceChannels', serviceChannelOptions, handleInputChange),
  handleMonthlyInteractionsChange: createDropdownHandler('monthlyInteractions', monthlyInteractionsOptions, handleInputChange),
  handleCurrentToolsChange: createDropdownHandler('currentTools', crmToolOptions, handleInputChange),
});