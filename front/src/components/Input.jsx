import { Button, Checkbox, Label, TextInput } from "flowbite-react";

export default function Input({
  type = "text",
  placeholder = "",
  label = "",
  name = "",
  value = "",
  onChange = () => {},
  required = false,
}) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <div className="mb-2 block">
        <Label>{label}:</Label>
      </div>
      <TextInput
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        required={required}
      />
    </div>
  );
}
