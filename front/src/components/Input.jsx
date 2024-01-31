import { Label, TextInput } from 'flowbite-react';
import PropTypes from 'prop-types';

export default function Input({
    type = 'text',
    placeholder = '',
    label = '',
    value = '',
    onChange = value => {},
    required = false,
    autoComplete = '',
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
                autoComplete={autoComplete}
                required={required}
                className={className}
            />
        </div>
    );
}

Input.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    autoComplete: PropTypes.string,
    required: PropTypes.bool,
    className: PropTypes.string,
};
