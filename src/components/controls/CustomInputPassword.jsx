import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function CustomInputPassword({
  control,
  name,
  label,
  placeholder,
  rules = {},
  required = false,
  className = "",
  defaultValue = "",
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <div className={`w-full ${className}`}>
          {label && (
            <label
              htmlFor={name}
              className="mb-1 block font-medium text-gray-700"
            >
              {label} {required && <span className="text-red-500">*</span>}
            </label>
          )}
          <div className="relative">
            <input
              id={name}
              type={showPassword ? "text" : "password"}
              placeholder={placeholder}
              className={`w-full rounded-lg border px-4 py-2 pr-10 focus:ring-2 focus:ring-amber-600 focus:outline-none ${
                error ? "border-red-500" : "border-gray-500"
              }`}
              {...field}
              {...rest}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
          </div>
          {error && (
            <p className="mt-1 text-sm text-red-600">{error.message}</p>
          )}
        </div>
      )}
    />
  );
}

CustomInputPassword.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  rules: PropTypes.object,
  required: PropTypes.bool,
  className: PropTypes.string,
};
