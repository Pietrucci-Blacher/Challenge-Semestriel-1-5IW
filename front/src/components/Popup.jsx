import React from "react";
import PropTypes from "prop-types";

export function Popup(props) {
  const { isOpen, onClose, children } = props;

  const popupStyle = `fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                       p-4 bg-white bg-opacity-90 border border-gray-300 rounded z-50 
                       ${isOpen ? "block" : "hidden"}`;

  const closeButtonStyle = "absolute top-4 right-4 cursor-pointer";

  return (
    <div className={popupStyle}>
      <div className={closeButtonStyle} onClick={onClose}>
        &#10006;
      </div>
      {children}
    </div>
  );
}

Popup.prototype = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
