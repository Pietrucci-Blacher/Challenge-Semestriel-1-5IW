import React from 'react';
import { Button as FlowbiteButton } from 'flowbite-react';
import PropTypes from 'prop-types';

export default function GenericButton({
    label = '',
    onClick = () => {},
    className = '',
    isLoading = false,
    ...props
}) {
    return (
        <FlowbiteButton onClick={onClick} className={className} type="submit" disabled={isLoading} isProcessing={isLoading}>
            {label}
        </FlowbiteButton>
    );
}

GenericButton.propTypes = {
    label: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string,
};
