import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

export default function CustomTextInput({
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
          <input
            id={name}
            type="text"
            placeholder={placeholder}
            className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-amber-600 focus:outline-none ${
              error ? "border-red-500" : "border-gray-500"
            }`}
            {...field}
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

CustomTextInput.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  rules: PropTypes.object,
  required: PropTypes.bool,
  className: PropTypes.string,
};
