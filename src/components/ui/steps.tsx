
import * as React from "react";
import { cn } from "@/lib/utils";

interface StepProps {
  title: string;
  description?: string;
  isActive?: boolean;
  isComplete?: boolean;
  isFailed?: boolean;
  children?: React.ReactNode;
}

const Step = ({
  title,
  description,
  isActive,
  isComplete,
  isFailed,
  children,
}: StepProps) => {
  return (
    <li className="relative flex flex-col items-center">
      <div className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full border-2 z-10 transition-colors",
        isActive && "border-primary text-primary",
        isComplete && "border-green-500 bg-green-500 text-white",
        isFailed && "border-destructive bg-destructive text-white",
        !isActive && !isComplete && !isFailed && "border-gray-300 text-gray-300"
      )}>
        {isComplete ? (
          <CheckIcon />
        ) : isFailed ? (
          <XIcon />
        ) : (
          <span className="text-sm font-semibold">{children}</span>
        )}
      </div>
      <div className="mt-2 text-center">
        <div className={cn(
          "text-sm font-semibold",
          isActive && "text-primary",
          isComplete && "text-green-500",
          isFailed && "text-destructive",
          !isActive && !isComplete && !isFailed && "text-gray-500"
        )}>
          {title}
        </div>
        {description && (
          <div className="mt-1 text-xs text-gray-500">{description}</div>
        )}
      </div>
    </li>
  );
};

interface StepsProps {
  activeStep: number;
  className?: string;
  children: React.ReactElement<StepProps>[];
}

const Steps = ({ activeStep, className, children }: StepsProps) => {
  // Clone children with additional props
  const steps = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        isActive: index === activeStep,
        isComplete: index < activeStep,
        isFailed: false,
        children: index + 1,
      });
    }
    return child;
  });

  return (
    <div className={cn("w-full", className)}>
      <ol className="flex justify-between">
        {steps}
        
        {/* Connecting lines */}
        {steps.length > 1 &&
          Array.from({ length: steps.length - 1 }).map((_, index) => (
            <li
              key={index}
              className={cn(
                "absolute top-4 -z-0 h-px w-full -translate-y-1/2 transform",
                index < activeStep
                  ? "bg-primary"
                  : "bg-gray-300"
              )}
              style={{
                left: `calc(${(index * 100) / (steps.length - 1)}% + ${16 / (steps.length - 1)}%)`,
                width: `calc(${100 / (steps.length - 1)}% - ${32 / (steps.length - 1)}%)`,
              }}
            />
          ))}
      </ol>
    </div>
  );
};

// Helper icons
const CheckIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.6667 3.5L5.25 9.91667L2.33333 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const XIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.5 3.5L3.5 10.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.5 3.5L10.5 10.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export { Steps, Step };
