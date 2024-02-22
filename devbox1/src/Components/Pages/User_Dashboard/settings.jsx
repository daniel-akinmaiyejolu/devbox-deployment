import React from 'react';
import { FaCog } from 'react-icons/fa'; // Import the cog icon from react-icons/fa

export const SettingsButton = ({ onClick }) => {
  return (
    <button className="settings-button" onClick={onClick}>
      <FaCog /> {/* Render the cog icon */}
    </button>
  );
};