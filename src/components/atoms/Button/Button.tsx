
export interface ButtonProps {
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
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className="cursor-pointer bg-amber-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-900 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2"
      style={{ backgroundColor : backgroundColor }}
      {...props}
    >
      {children}
    </button>
  );
};
