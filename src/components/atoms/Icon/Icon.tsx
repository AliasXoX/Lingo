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
    ) as ReactSVGElement,
    delete: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#000000">
        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
      </svg>
    ) as ReactSVGElement,
    edit: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#000000">
        <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
      </svg>
    ) as ReactSVGElement,
    dropdown: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#000000">
        <path d="M480-360 280-560h400L480-360Z"/>
      </svg>
    ) as ReactSVGElement,
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
