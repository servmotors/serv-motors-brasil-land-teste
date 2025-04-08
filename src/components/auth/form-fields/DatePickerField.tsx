
import React from 'react';
import { format, parse } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface DatePickerFieldProps {
  id: string;
  label: string;
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  error?: string;
  infoText?: string;
  isError?: boolean;
  disabledDates?: (date: Date) => boolean;
}

const DatePickerField = ({
  id,
  label,
  selectedDate,
  onDateChange,
  error,
  infoText,
  isError,
  disabledDates
}: DatePickerFieldProps) => {
  
  const handleManualInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const cleanedValue = inputValue.replace(/\D/g, '');
    
    let formattedValue = cleanedValue;
    if (cleanedValue.length > 2) {
      formattedValue = `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2, 4)}`;
      if (cleanedValue.length > 4) {
        formattedValue += `/${cleanedValue.slice(4, 8)}`;
      }
    }
    e.target.value = formattedValue;

    if (formattedValue.length === 10) {
      const parsedDate = parse(formattedValue, 'dd/MM/yyyy', new Date());
      if (!isNaN(parsedDate.getTime())) {
        onDateChange(parsedDate);
      }
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center space-x-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id={id}
              variant="outline"
              className={cn(
                "w-1/2 justify-start text-left font-normal",
                !selectedDate && "text-muted-foreground",
                isError && "border-red-500 text-red-500"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, 'dd/MM/yyyy') : <span>Selecione uma data</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={onDateChange}
              disabled={disabledDates}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
        <Input
          type="text"
          placeholder="DD/MM/AAAA"
          maxLength={10}
          className={cn(
            "w-1/2",
            isError && "border-red-500 text-red-500"
          )}
          onChange={handleManualInput}
          defaultValue={selectedDate ? format(selectedDate, 'dd/MM/yyyy') : ''}
        />
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
      {infoText && (
        <p className="text-sm text-green-500">{infoText}</p>
      )}
    </div>
  );
};

export default DatePickerField;
