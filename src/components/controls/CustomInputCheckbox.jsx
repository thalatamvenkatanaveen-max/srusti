import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

export default function CustomInputCheckbox({
  control,
  name,
  label,
  required = false,
  rules = {},
  className = "",
  defaultValue = false,
  ...rest
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <div className={`mb-4 ${className}`}>
          <div className="flex items-center">
            <input
              id={name}
              type="checkbox"
              checked={!!field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              className={`h-5 w-5 rounded border-gray-500 text-amber-600 focus:ring-amber-600 ${error ? "border-red-500" : "border-gray-500"}`}
              {...rest}
            />
            <label
              htmlFor={name}
              className="ml-2 block cursor-pointer space-x-2 text-gray-700 select-none"
            >
              {label}
              {required && <span className="text-red-500">*</span>}
            </label>
          </div>
          {error && (
            <p className="bock text-sm text-red-600">{error.message}</p>
          )}
        </div>
      )}
    />
  );
}

CustomInputCheckbox.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  required: PropTypes.bool,
  rules: PropTypes.object,
  className: PropTypes.string,
  defaultValue: PropTypes.bool,
};
