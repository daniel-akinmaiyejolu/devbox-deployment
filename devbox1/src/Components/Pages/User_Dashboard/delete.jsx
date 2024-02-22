import React from 'react';
import { FaTrash } from 'react-icons/fa'; // Import the trash icon from react-icons/fa

export const DeleteButton = ({ onClick }) => {
  return (
    <button className="delete-button" onClick={onClick}>
      <FaTrash /> {/* Render the trash icon */}
      <span className="btn-text">Delete</span> {/* Text for the button */}
    </button>
  );
};