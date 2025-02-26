import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import clx from "classNames";
import React, { useState, type ReactNode } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  className?: string;
}

const Input: React.FC<InputProps> = ({ label, className, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      {label && (
        <label
          htmlFor={rest.type}
          className="block text-[1em] font-bold  font-bricolage leading-6 text-black"
        >
          {label}
        </label>
      )}
      <div className="mt-2 relative">
        {rest.type === "password" && (
          <button
            type="button"
            className="absolute right-4 top-4"
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
          className={clx(
            "block w-full rounded-2xl border-0   p-3 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6",
            className
          )}
        />
      </div>
    </div>
  );
};

export default Input;