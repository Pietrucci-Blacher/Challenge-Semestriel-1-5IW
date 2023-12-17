import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function StarsLine({
                                      className,
                                      totalStar,
                                      filledStar,
                                      isEditable = false,
                                      size = 'md',
                                      onStarClick,
                                      onMouseLeave,
                                  }) {
    const [hoveredStar, setHoveredStar] = useState(null);
    const [filledStars, setFilledStars] = useState(filledStar);

    useEffect(() => {
        setFilledStars(filledStar);
    }, [filledStar]);

    const handleStarClick = (starIndex, isHalf) => {
        if (isEditable) {
            const newFilledStars = isHalf ? starIndex + 0.5 : starIndex + 1;
            setFilledStars(newFilledStars);
            onStarClick?.(starIndex + 1, newFilledStars); // pass the star index to onStarClick
        }
    };

    const handleMouseEnter = (starIndex, isHalf) => {
        if (isEditable) {
            setHoveredStar(isHalf ? starIndex + 0.5 : starIndex + 1);
        }
    };

    const handleMouseLeave = () => {
        setHoveredStar(null);
        onMouseLeave?.();
    };

    const isHoveredStar = (star) => hoveredStar !== null && hoveredStar === star;

    const stars = Array.from({ length: totalStar }, (_, i) => {
        const isHalf = filledStars - i === 0.5;
        const isFilled = filledStars > i;

        return (
            <button
                key={i}
                className={`text-xl ${
                    isEditable ? 'cursor-pointer' : ''
                } ${isHoveredStar(i + 1) || isFilled ? 'text-yellow-500' : 'text-gray-300'}`}
                onClick={() => handleStarClick(i, isHalf)}
                onMouseEnter={() => handleMouseEnter(i, isHalf)}
                onMouseLeave={handleMouseLeave}
            >
                {renderStar(i + 1)}
            </button>
        );
    });

    function renderStar(star) {
        const fullStars = Math.floor(filledStars);
        if (star <= fullStars) {
            return '★';
        } else if (star === fullStars + 0.5) {
            return '★½';
        } else {
            return '☆';
        }
    }

    return <div className={`flex ${getSizeClass(size)}`}>{stars}</div>;
}

StarsLine.propTypes = {
    className: PropTypes.string,
    totalStar: PropTypes.number,
    filledStar: PropTypes.number,
    isEditable: PropTypes.bool,
    size: PropTypes.oneOf(['', 'md', 'lg']),
    onStarClick: PropTypes.func,
    onMouseLeave: PropTypes.func,
};

function getSizeClass(size) {
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
}
