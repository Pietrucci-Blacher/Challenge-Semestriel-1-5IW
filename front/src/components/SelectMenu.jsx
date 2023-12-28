// SelectMenu.jsx
import React from 'react';
import { Label, Select } from 'flowbite-react';
import PropTypes from 'prop-types';

export default function SelectMenu({ label, options, id, onChange, ...props }) {
    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        onChange(selectedValue);
    };

    return (
        <div className="max-w-md">
            {label && (
                <div className="mb-2 block">
                    <Label htmlFor={id || 'select'} value={label} />
                </div>
            )}
            <Select {...props} id={id} onChange={handleSelectChange} required>
                <option value="">Select {label}</option>
                {options.map((option) => (
                    <option
                        key={String(option.value)}
                        value={String(option.value)}
                    >
                        {option.label}
                    </option>
                ))}
            </Select>
        </div>
    );
}

SelectMenu.propTypes = {
    label: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                .isRequired,
        }),
    ).isRequired,
    id: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};
