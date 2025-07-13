import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

export default function CustomInputSelect({
  control,
  name,
  label,
  options,
  required = false,
  placeholder = "Select an option",
  className = "",
  defaultValue = "",
  rules = {},
  ...rest
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <div className={`mb-4 w-full ${className}`}>
          {label && (
            <label
              htmlFor={name}
              className="mb-1 block font-medium text-gray-700"
            >
              {label} {required && <span className="text-red-500">*</span>}
            </label>
          )}
          <select
            id={name}
            {...field}
            className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-amber-600 focus:outline-none ${
              error ? "border-red-500" : "border-gray-500"
            }`}
            {...rest}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {error && (
            <p className="mt-1 text-sm text-red-600">{error.message}</p>
          )}
        </div>
      )}
    />
  );
}

CustomInputSelect.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ).isRequired,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  rules: PropTypes.object,
};
