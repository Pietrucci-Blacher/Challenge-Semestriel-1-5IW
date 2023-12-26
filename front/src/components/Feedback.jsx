import React, { useState } from "react";
import StarsLine from "@/components/feedback/StarsLine";
import feedbackData from "./feedback/feedbackEntity.json";
import PropTypes from "prop-types";
import Input from "@/components/Input";

export default function Feedback({ showFeedback }) {
  const [scores, setScores] = useState(
    showFeedback && feedbackData[showFeedback]
      ? feedbackData[showFeedback].reduce((acc, label) => {
          acc[label] = 0;
          return acc;
        }, {})
      : {},
  );

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

  const calculateFinalScore = () => {
    const totalFeedbacks = Object.values(scores).length;
    const finalScore =
      Object.values(scores).reduce((total, score) => total + score, 0) /
      totalFeedbacks;
    console.log("Final Score:", finalScore);

    const resultJson = {
      average: finalScore,
      [showFeedback]: Object.entries(scores).reduce((acc, [label, stars]) => {
        acc[label] = stars;
        return acc;
      }, {}),
    };

    console.log("Result JSON:", resultJson);
  };

  return (
    <div>
      {showFeedback &&
        feedbackData[showFeedback]?.map((label) => (
          <div
            key={label}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <span style={{ marginLeft: "10px" }}>{label}</span>
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
      {showFeedback && (
        <button onClick={calculateFinalScore}>Afficher le résultat</button>
      )}
    </div>
  );
}

Feedback.propTypes = {
  showFeedback: PropTypes.string,
};
