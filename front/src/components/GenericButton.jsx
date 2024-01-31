import React from 'react';
import { Button as FlowbiteButton } from 'flowbite-react';
import PropTypes from "prop-types";

export default function GenericButton({
    label = '',
    onClick = () => {},
    className = '',
    ...props
}) {
    return (
        <FlowbiteButton onClick={onClick} className={className} type="submit">
            {label}
        </FlowbiteButton>
    );
}

GenericButton.propTypes = {
    label: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string,
}
