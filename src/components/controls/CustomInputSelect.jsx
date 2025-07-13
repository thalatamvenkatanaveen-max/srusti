import PropTypes from "prop-types";

export default function CustomSelect({
  label,
  id,
  name,
  value,
  onChange,
  options,
  error,
  placeholder,
  required,
  className = "",
  ...rest
}) {
  return (
    <div className={`mb-4 w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="mb-1 block font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-amber-600 focus:outline-none ${
          error ? "border-red-500" : "border-gray-500"
        }`}
        {...rest}
      >
        <option value="" disabled>
          {placeholder || "Select an option"}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

CustomSelect.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }),
  ).isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
};
