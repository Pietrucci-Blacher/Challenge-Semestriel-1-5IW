import React, { useState } from 'react';
import { Label, TextInput } from 'flowbite-react';
import PropTypes from 'prop-types';
import { HiEye, HiEyeOff } from 'react-icons/hi';

export default function Input({
    type = 'text',
    placeholder = '',
    label = '',
    value = '',
    onChange = (value) => {},
    required = false,
    autoComplete = '',
    className = '',
}) {
    const [inputType, setInputType] = useState(type);
    const [isPasswordVisible, setIsPasswordVisible] = useState(
        type !== 'password',
    );
    const [showLabel, setShowLabel] = useState(true);

    const handleChange = (e) => {
        onChange(e.target.value);
    };

    const togglePasswordVisibility = (event) => {
        event.stopPropagation();
        const nextInputType = inputType === 'password' ? 'text' : 'password';
        setInputType(nextInputType);
        setIsPasswordVisible(!isPasswordVisible);
    };

    const labelElem = label && (
        <div className={`mb-2 block ${showLabel ? '' : 'hidden'}`}>
            <Label>{label}:</Label>
        </div>
    );

    const eyeIcon = isPasswordVisible ? <HiEye /> : <HiEyeOff />;

    return (
        <div className="flex-1">
            {labelElem}
            <div className="flex flex-row items-center relative">
                <TextInput
                    type={inputType}
                    value={value}
                    placeholder={placeholder}
                    onChange={handleChange}
                    autoComplete={autoComplete}
                    required={required}
                    className={`flex-1 ${className}`}
                />
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-5 top-1/2 transform -translate-y-1/2"
                    >
                        {eyeIcon}
                    </button>
                )}
            </div>
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
