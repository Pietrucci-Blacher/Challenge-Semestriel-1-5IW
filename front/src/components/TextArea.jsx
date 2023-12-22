import { Label, Textarea } from "flowbite-react";
import PropTypes from "prop-types";

export default function TextArea({
  label,
  type,
  value,
  placeholder,
  onChange,
  required,
}) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <div className="mb-2 block">
        <Label>{label}:</Label>
      </div>
      <Textarea
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        required={required}
      />
    </div>
  );
}

TextArea.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};
