import { ButtonHTMLAttributes } from "react";
import clx from "classNames"
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string; // Allow custom styles through className
};

const Button: React.FC<ButtonProps> = ({
  children,
  className = "", // Defaults to an empty string if not provided
  ...rest
}) => {
  const defaultClassName =
    "flex justify-center  font-bricolage items-center  w-[10em] text-white h-auto p-2 rounded-full bg-primary  flex justify-center items-center  text-white hover:bg-primary";

  const finalClassName = `${defaultClassName} ${className}`.trim(); 

  return (
    <button {...rest} className={clx(`${finalClassName} ${className}`.trim(),className)}>
      {children}
    </button>
  );
};

export default Button;
