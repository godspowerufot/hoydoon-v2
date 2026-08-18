"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type AuthFormFieldProps = {
  id: string;
  label: string;
  type?: "email" | "password" | "text" | "tel";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoComplete?: string;
};

export default function AuthFormField({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  autoComplete,
}: AuthFormFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-[#111]">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={isPassword && showPassword ? "text" : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`h-12 w-full rounded-lg border bg-white px-4 text-[15px] text-[#111] outline-none transition-colors placeholder:text-[#a3a3a3] focus:border-primary focus:ring-2 focus:ring-primary/15 ${
            error ? "border-red-400" : "border-[#d1d1d6]"
          } ${isPassword ? "pr-11" : ""}`}
        />
        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a8a8a] hover:text-[#111]"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        ) : null}
      </div>
      {error ? <p className="mt-1.5 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
