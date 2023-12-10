import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Rating } from 'flowbite-react';

export default function StarsLine({ className, totalStar, filledStar, isEditable = false, size = 'm' }) {
    const [filledStars, setFilledStars] = useState(filledStar);

    const handleStarInteraction = (starIndex, isHalf, isEditable) => {
        if (isEditable) {
            const newFilledStars = isHalf ? starIndex + 0.5 : starIndex + 1;
            setFilledStars(newFilledStars);
        }
    };

    const stars = Array.from({ length: totalStar }, (v, i) => {
        const isHalf = filledStars > i && filledStars < i + 1;
        const isFilled = filledStars > i;

        return (
            <Rating.Star
                className={`${isEditable ? 'hover:cursor-pointer' : ''}`}
                key={i}
                filled={isFilled}
                halfFilled={isHalf}
                onClick={() => handleStarInteraction(i, isHalf, isEditable)}
                onMouseEnter={() => handleStarInteraction(i, true, isEditable)}
                onMouseLeave={() => handleStarInteraction(i, false, isEditable)}
            />
        );
    });

    return (
        <Rating
            className={className}
            size={size === 'md' || size === 'lg' ? size : undefined}
        >
            {stars}
        </Rating>
    );
}

StarsLine.propTypes = {
    className: PropTypes.string,
    totalStar: PropTypes.number,
    filledStar: PropTypes.number,
    isEditable: PropTypes.bool,
    size: PropTypes.oneOf(['', 'md', 'lg']),
};
