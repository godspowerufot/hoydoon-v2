import { ButtonHTMLAttributes } from "react";
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string; // Allow custom styles through className
  isLoading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  className = "", // Defaults to an empty string if not provided
  isLoading = false,
  disabled,
  ...rest
}) => {
  const defaultClassName =
    "flex justify-center font-bricolage items-center text-white p-2 rounded-full bg-primary group-hover:text-white lg:w-[115px] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed";

  const finalClassName = `${defaultClassName} ${className}`.trim();

  return (
    <button
      {...rest}
      disabled={disabled || isLoading}
      className={finalClassName}
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
