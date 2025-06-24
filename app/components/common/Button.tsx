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
    "flex justify-center  font-bricolage items-center  text-white  p-2 rounded-full bg-primary group-hover:text-white lg:w-[115px]  flex justify-center items-center   ";

  const finalClassName = `${defaultClassName} ${className}`.trim();

  return (
    <button {...rest} className={`${finalClassName} ${className}`.trim()}>
      {children}
    </button>
  );
};

export default Button;
