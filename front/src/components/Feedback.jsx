import React, { useState } from 'react';
import StarsLine from '@/components/feedback/StarsLine';
import feedbackData from './feedback/feedbackEntity.json';
import PropTypes from 'prop-types';
import Input from '@/components/Input';
import TextArea from '@/components/TextArea';

export default function Feedback({ showFeedback, onCloseModal }) {
    const [scores, setScores] = useState(
        showFeedback && feedbackData[showFeedback]
            ? feedbackData[showFeedback].reduce((acc, label) => {
                  acc[label] = 0;
                  return acc;
              }, {})
            : {},
    );

    const [formData, setFormData] = useState({
        comment: '',
        resultJson: {},
    });

    const [locked, setLocked] = useState({});

    const handleStarClick = (starIndex, newScore, label) => {
        if (locked[label]) {
            // If locked, reset the score to 0
            setScores((prevScores) => ({ ...prevScores, [label]: 0 }));
            setLocked((prevLocked) => ({ ...prevLocked, [label]: false }));
        } else {
            // If not locked, set the new score and lock it
            setScores((prevScores) => ({ ...prevScores, [label]: newScore }));
            setLocked((prevLocked) => ({ ...prevLocked, [label]: true }));
        }
    };

    const handleMouseLeave = (label) => {
        if (!locked[label]) {
            setScores((prevScores) => ({ ...prevScores, [label]: 0 }));
        }
    };

    const handleChange = (value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            comment: value,
        }));
    };

    console.log('formData', formData);

    const calculateFinalScore = () => {
        const totalFeedbacks = Object.values(scores).length;
        const finalScore =
            Object.values(scores).reduce((total, score) => total + score, 0) /
            totalFeedbacks;

        const resultJson = {
            average: finalScore,
            [showFeedback]: Object.entries(scores).reduce(
                (acc, [label, stars]) => {
                    acc[label] = stars;
                    return acc;
                },
                {},
            ),
        };

        setFormData((prevFormData) => ({
            ...prevFormData,
            resultJson: JSON.stringify({test: 'test'}),
        }));
        onCloseModal(formData);
    };

    return (
        <div>
            {showFeedback &&
                feedbackData[showFeedback]?.map((label) => (
                    <div
                        key={label}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '10px',
                        }}
                    >
                        <span style={{ marginLeft: '10px' }}>{label}</span>
                        <StarsLine
                            totalStar={5}
                            filledStar={scores[label]}
                            isEditable={true}
                            size="lg"
                            onStarClick={(starIndex, newScore) =>
                                handleStarClick(starIndex, newScore, label)
                            }
                            onMouseLeave={() => handleMouseLeave(label)}
                        />
                    </div>
                ))}
            <br />
            <TextArea
                label="Commentaire"
                placeholder="Commentaire"
                type="textarea"
                onChange={handleChange}
            />
            <br />
            {showFeedback && (
                <button
                    className="flex items-center px-2 py-2 rounded bg-gray-200 font-semibold underline hover:bg-gray-100"
                    onClick={calculateFinalScore}
                >
                    Envoyer le feedback
                </button>
            )}
        </div>
    );
}

Feedback.propTypes = {
    showFeedback: PropTypes.string,
    onCloseModal: PropTypes.func,
};
