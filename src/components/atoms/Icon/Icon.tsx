import { ReactSVGElement } from "react";

export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  className?: string;
}

const IconClass: Record<string, ReactSVGElement> = {
    cross: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6L18 18M18 6L6 18" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    ) as ReactSVGElement
}

/** Primary UI component for user interaction */
export const Icon = ({
  name,
  className = '',
  ...props
}: IconProps) => {
  return (
    <div {...props} className={`flex items-center justify-center ${className}`}>
        {IconClass[name]}
    </div>
  );
}
