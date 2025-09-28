import React from 'react';

const TeamNameErrorPopup = ({ 
  isVisible, 
  teamName, 
  onClose, 
  inputId = 'teamName' 
}) => {
  const handleClose = () => {
    onClose();
    // Focus back on team name input for better UX
    document.getElementById(inputId)?.focus();
  };

  if (!isVisible) return null;

  return (
    <>
      {/* CSS Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: scale(0.8) translateY(-12px);
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0);
          }
        }
        .popup-animation {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>

      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        {/* Modal Content */}
        <div className="popup-animation bg-white p-8 rounded-lg shadow-xl max-w-sm w-11/12 text-center">
          {/* Warning Icon */}
          <div className="text-5xl text-red-500 mb-4">
            ⚠️
          </div>
          
          {/* Title */}
          <h3 className="text-red-500 mb-4 text-lg font-semibold">
            Team Name Already Taken
          </h3>
          
          {/* Message */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            The team name "<span className="font-bold">{teamName}</span>" is already in use. Please choose a different team name.
          </p>
          
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
          >
            Choose Different Name
          </button>
        </div>
      </div>
    </>
  );
};

export default TeamNameErrorPopup;