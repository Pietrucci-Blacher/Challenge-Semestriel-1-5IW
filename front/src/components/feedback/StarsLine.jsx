import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Star = ({
    index,
    filledStars,
    isEditable,
    onStarClick,
    onMouseEnter,
    onMouseLeave,
}) => {
    const isHalf = filledStars - index === 0.5;
    const isFilled = filledStars > index;
    const isHovered = isEditable && (isHalf || index + 1 === filledStars);

    const starClasses = `text-xl ${isEditable ? 'cursor-pointer' : ''} ${
        isHovered || isFilled ? 'text-yellow-500' : 'text-gray-300'
    }`;

    const handleStarClick = () => {
        if (isEditable) {
            const newFilledStars = isHalf ? index + 0.5 : index + 1;
            onStarClick?.(index + 1, newFilledStars);
        }
    };

    return (
        <button
            className={starClasses}
            onClick={handleStarClick}
            onMouseEnter={() => onMouseEnter(index, isHalf)}
            onMouseLeave={onMouseLeave}
        >
            {renderStar(index + 1, filledStars)}
        </button>
    );
};

Star.propTypes = {
    index: PropTypes.number,
    filledStars: PropTypes.number,
    isEditable: PropTypes.bool,
    onStarClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
};

const renderStar = (star, filledStars) => {
    const fullStars = Math.floor(filledStars);
    return star <= fullStars ? '★' : star === fullStars + 0.5 ? '★½' : '☆';
};

const StarsLine = ({
    className,
    totalStar,
    filledStar,
    isEditable = false,
    size = 'md',
    onStarClick,
    onMouseLeave,
}) => {
    const [localFilledStars, setLocalFilledStars] = useState(filledStar);
    const [hoveredStar, setHoveredStar] = useState(null);

    useEffect(() => {
        setLocalFilledStars(filledStar);
    }, [filledStar]);

    const handleMouseEnter = (index, isHalf) => {
        if (isEditable) {
            setHoveredStar(isHalf ? index + 0.5 : index + 1);
        }
    };

    const handleMouseLeave = () => {
        setHoveredStar(null);
        onMouseLeave?.();
    };

    const handleStarClick = (starIndex, newFilledStars) => {
        setLocalFilledStars(newFilledStars);
        onStarClick?.(starIndex, newFilledStars);
    };

    const stars = Array.from({ length: totalStar }, (_, i) => (
        <Star
            key={i}
            index={i}
            filledStars={localFilledStars}
            isEditable={isEditable}
            onStarClick={handleStarClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        />
    ));

    return <div className={`flex ${getSizeClass(size)}`}>{stars}</div>;
};

StarsLine.propTypes = {
    className: PropTypes.string,
    totalStar: PropTypes.number,
    filledStar: PropTypes.number,
    isEditable: PropTypes.bool,
    size: PropTypes.oneOf(['', 'sm', 'md', 'lg']),
    onStarClick: PropTypes.func,
    onMouseLeave: PropTypes.func,
};

const getSizeClass = (size) => {
    switch (size) {
        case 'sm':
            return 'text-sm';
        case 'md':
            return 'text-md';
        case 'lg':
            return 'text-lg';
        default:
            return '';
    }
};

export default StarsLine;
