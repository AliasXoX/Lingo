import React from 'react';

export interface ModalWrapperProps {
  isOpen?: boolean;
  children?: React.ReactNode;
}

/** Primary UI component for user interaction */
export const ModalWrapper = ({
  children,
  isOpen = false,
  ...props
}: ModalWrapperProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed w-full h-full bg-[var(--color-modal-bg)] flex items-center justify-center z-50" {...props}>
        {children}
    </div>
  );
};
