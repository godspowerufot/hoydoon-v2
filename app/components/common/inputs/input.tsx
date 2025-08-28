"use client";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import React, { useState, type ReactNode } from "react";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  className?: string;
}

const Input: React.FC<InputProps> = ({ label, className, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputClasses = clsx(
    "block font-light bg-transparent w-full placeholder:font-bricolage placeholder:font-light placeholder:text-[1rem] h-[3rem] 2xl:h-[3.5rem] lg:rounded-2xl border border-gray p-4 text-gray-700 rounded-md placeholder:text-gray-500",
    className
  );

  const labelClasses =
    "block text-base lg:text-[1em] mb-2 2xl:text-[1.2em] font-light font-bricolage leading-6 text-gray-700";

  return (
    <div>
      {label && (
        <label htmlFor={rest.name} className={labelClasses}>
          {label}
        </label>
      )}
      <div className="relative">
        {rest.type === "password" && (
          <button
            type="button"
            className="absolute  right-4 top-5 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaRegEyeSlash className="text-gray-500" />
            ) : (
              <FaRegEye className="text-gray-500" />
            )}
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
          required
          className={inputClasses}
        />
      </div>
    </div>
  );
};

export default Input;
