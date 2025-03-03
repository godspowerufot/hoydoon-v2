import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import React, { useState, type ReactNode } from "react";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  className?: string;
}

const Input: React.FC<InputProps> = ({ label, className,  ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      {label && (
        <label
          htmlFor={rest.type}
          className="block text-[1em] 2xl:text-[1.2em] font-normal font-bricolage leading-6 text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="mt-2 relative">
        {rest.type === "password" && (
          <button
            type="button"
            className="absolute right-4 top-4 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        )}
        <input
          {...rest}
          type={
            rest.type === "password"
              ? showPassword
                ? "text"
                : "password"
              : rest.type
          }
          className={
            `block  font-light  w-full placeholder:font-bricolage placeholder:font-light placeholder:text-[1rem] h-[3rem] rounded-2xl border border-[#d6d5d5] p-4 text-gray-700  placeholder:px-2 placeholder:text-gray-500  ${className}`
          }
        />
      </div>
    </div>
  );
};

export default Input;
