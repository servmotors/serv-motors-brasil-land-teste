
import React from 'react';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { TransportType } from './types';

interface TransportTypeItemProps {
  type: TransportType;
  isSelected: boolean;
  onSelect: (id: string) => void;
  name: string;
}

const TransportTypeItem = ({ type, isSelected, onSelect, name }: TransportTypeItemProps) => {
  return (
    <Tooltip key={type.id}>
      <TooltipTrigger asChild>
        <label
          htmlFor={`transport-type-${type.id}`}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground",
            isSelected && "border-primary"
          )}
        >
          <input
            type="radio"
            id={`transport-type-${type.id}`}
            name={`${name}-type`}
            value={type.id}
            className="sr-only"
            checked={isSelected}
            onChange={() => onSelect(type.id)}
          />
          <div className="mb-3 text-center">{type.icon}</div>
          <div className="text-center text-sm font-medium">
            {type.name}
            {type.hintText && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 ml-1 inline-block text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{type.hintText}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </label>
      </TooltipTrigger>
      <TooltipContent>
        <p>{type.tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default TransportTypeItem;
