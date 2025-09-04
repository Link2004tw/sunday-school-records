import React from "react";

const PrimaryButton = ({
  children,
  onClick,
  disabled = false,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-2 rounded-md bg-blue-600 text-blue-700 font-medium text-sm leading-6
        hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 hover:text-white
        disabled:bg-blue-300 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
