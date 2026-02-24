
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** What background color to use */
  backgroundColor?: string;
  /** Optional click handler */
  children?: React.ReactNode;
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Button = ({
  primary = false,
  backgroundColor,
  children,
  className = '',
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-medium text-gray-900 ${className}`}
      style={{ backgroundColor : backgroundColor }}
      {...props}
    >
      {children}
    </button>
  );
};
