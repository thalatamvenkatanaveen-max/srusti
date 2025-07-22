import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

export default function CustomInputTextArea({
  control,
  name,
  label,
  placeholder,
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
        <div className={`w-full ${className}`}>
          {label && (
            <label
              htmlFor={name}
              className="mb-1 block font-medium text-gray-700"
            >
              {label} {required && <span className="text-red-500">*</span>}
            </label>
          )}
          <textarea
            id={name}
            {...field}
            placeholder={placeholder}
            rows={4}
            className={`w-full resize-none rounded-lg border px-4 py-2 focus:ring-2 focus:ring-amber-600 focus:outline-none ${
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

CustomInputTextArea.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  rules: PropTypes.object,
};
