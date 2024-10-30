import React from "react";

interface InfoRibbonProps {
  message: string;
  expandedMessage: string; // Make this required to show all the information at once
}

const InfoRibbon: React.FC<InfoRibbonProps> = ({
  message,
  expandedMessage,
}) => {
  return (
    <div className="relative bg-blue-600 text-white p-4 rounded-md shadow-lg transition-transform transform hover:scale-105">
      <p className="text-sm">{message}</p>
      <p className="text-xs mt-2">{expandedMessage}</p>
    </div>
  );
};

export default InfoRibbon;
