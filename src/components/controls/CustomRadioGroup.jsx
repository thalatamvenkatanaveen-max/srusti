import PropTypes from "prop-types";

export default function CustomRadioGroup({
  label,
  name,
  value,
  onChange,
  options,
  error,
  required,
  className = "",
}) {
  return (
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
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={onChange}
              className="form-radio h-5 w-5 text-amber-600 focus:ring-amber-600"
            />
            <span className="ml-2 text-gray-700">{opt.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

CustomRadioGroup.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }),
  ).isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
};
