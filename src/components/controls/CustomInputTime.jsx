import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

export default function CustomTimeInput({
  name,
  control,
  label,
  required = false,
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
          <input
            type="time"
            id={name}
            {...field}
            className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-amber-600 focus:outline-none ${
              error ? "border-red-500" : "border-gray-500"
            }`}
            {...rest}
          />
          {error && (
            <p className="mt-1 text-sm text-red-600">{error.message}</p>
          )}
        </div>
      )}
    />
  );
}

CustomTimeInput.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  rules: PropTypes.object,
};
