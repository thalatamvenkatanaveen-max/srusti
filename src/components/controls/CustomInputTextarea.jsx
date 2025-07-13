import PropTypes from "prop-types";

export default function CustomTextarea({
  label,
  id,
  name,
  value,
  onChange,
  placeholder,
  error,
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
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        className={`w-full resize-none rounded-lg border px-4 py-2 focus:ring-2 focus:ring-amber-600 focus:outline-none ${
          error ? "border-red-500" : "border-gray-500"
        }`}
        {...rest}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

CustomTextarea.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
};
