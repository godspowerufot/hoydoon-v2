import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string; // Allow custom styles through className
};

const Button: React.FC<ButtonProps> = ({
  children,
  className = "", // Defaults to an empty string if not provided
  ...rest
}) => {
  const defaultClassName =
    "flex justify-center font-bricolage items-center w-[7.5em] h-auto px-4 py-2 rounded-full bg-primary text-white font-semibold hover:bg-primary";

  const finalClassName = `${defaultClassName} ${className}`.replace(
    /text-\w+/g,
    ""
  ).trim(); 

  return (
    <button {...rest} className={`${finalClassName} ${className}`.trim()}>
      {children}
    </button>
  );
};

export default Button;
