import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

export default function CustomRadioGroup({
  control,
  name,
  label,
  options,
  required = false,
  className = "",
  defaultValue = "",
  rules = {},
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
            <p className="mb-1 font-medium text-gray-700">
              {label} {required && <span className="text-red-500">*</span>}
            </p>
          )}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {options.map((opt) => (
              <label key={opt.value} className="inline-flex items-center">
                <input
                  type="radio"
                  value={opt.value}
                  checked={field.value === opt.value}
                  onChange={field.onChange}
                  className="form-radio h-5 w-5 text-amber-600 focus:ring-amber-600"
                />
                <span className="ml-2 text-gray-700">{opt.label}</span>
              </label>
            ))}
          </div>
          {error && (
            <p className="mt-1 text-sm text-red-600">{error.message}</p>
          )}
        </div>
      )}
    />
  );
}

CustomRadioGroup.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }),
  ).isRequired,
  required: PropTypes.bool,
  className: PropTypes.string,
  rules: PropTypes.object,
};
