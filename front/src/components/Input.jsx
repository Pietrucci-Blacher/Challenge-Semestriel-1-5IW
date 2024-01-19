import { Button, Checkbox, Label, TextInput } from 'flowbite-react';

export default function Input({
    type = 'text',
    placeholder = '',
    label = '',
    name = '',
    value = '',
    onChange = () => {},
    required = false,
    className = '',
}) {
    const handleChange = (e) => {
        onChange(e.target.value);
    };

    const labelElem = label && (
        <div className="mb-2 block">
            <Label>{label}:</Label>
        </div>
    );

    return (
        <div className="flex-1">
            {labelElem}
            <TextInput
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
                required={required}
                className={className}
            />
        </div>
    );
}
