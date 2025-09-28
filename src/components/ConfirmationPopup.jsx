import React from 'react';

const ConfirmationPopup = ({ 
  isVisible, 
  teamName, 
  members,
  onConfirm,
  onCancel,
  isLoading = false
}) => {
  if (!isVisible) return null;

  // Filter for filled members to display
  const filledMembers = members.filter(member => 
    member.name.trim() && member.moodle_id.trim()
  );

  return (
    <>
      {/* CSS for animations and custom scrollbar */}
      <style>{`
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: scale(0.95);
          }
          to { 
            opacity: 1; 
            transform: scale(1);
          }
        }
        .popup-animation {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        /* Custom scrollbar for a themed look */
        .themed-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .themed-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .themed-scrollbar::-webkit-scrollbar-thumb {
          background: #fbbd23; /* yellow-400 */
          border-radius: 10px;
        }
        .themed-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #fca510; /* yellow-500 */
        }
      `}</style>

      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4">
        
        {/* Modal Content */}
        <div className="popup-animation bg-black/90 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-yellow-400/30">
          
          {/* Header */}
          <div className="text-yellow-400 px-6 py-4 border-b border-yellow-400/30">
            <h2 className="text-xl font-bold font-starjout flex items-center">
              Confirm Registration
            </h2>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-150px)] p-6 space-y-6 themed-scrollbar">

            {/* Team Information */}
            <div className="bg-black/30 border border-yellow-400/20 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-yellow-400 mb-3">Team Information</h3>
              <div className="flex items-center">
                <span className="font-medium text-gray-400 w-28">Team Name:</span>
                <span className="text-white font-semibold text-lg">{teamName}</span>
              </div>
            </div>

            {/* Members Information */}
            <div className="bg-black/30 border border-yellow-400/20 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-yellow-400 mb-4">
                Team Members to be Registered ({filledMembers.length})
              </h3>
              
              <div className="space-y-4">
                {filledMembers.map((member, index) => (
                  <div key={index} className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-200 text-base mb-3">
                      Member {index + 1}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2 text-sm">
                      <DetailItem label="Name" value={member.name} highlight />
                      <DetailItem label="Moodle ID" value={member.moodle_id} highlight />
                      {member.location && <DetailItem label="Location" value={member.location} />}
                      {member.year && <DetailItem label="Year" value={member.year} />}
                      {member.phone && <DetailItem label="Phone" value={member.phone} />}
                      {member.div && <DetailItem label="Division" value={member.div} />}
                      {member.email_id && <DetailItem label="Email" value={member.email_id} fullWidth />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Warning Note */}
            <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-4">
              <div className="flex items-start">
                <span className="text-yellow-400 text-xl mr-3 mt-1">⚠️</span>
                <div>
                  <h4 className="font-semibold text-yellow-300">Please Review Carefully</h4>
                  <p className="text-yellow-400/80 text-sm">
                    This information will be saved permanently. Ensure all details are correct before confirming.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer with Action Buttons */}
          <div className="border-t border-yellow-400/30 px-6 py-4 bg-black/50">
            <div className="flex justify-end space-x-3">
              <button
                onClick={onCancel}
                disabled={isLoading}
                className="px-6 py-2 bg-transparent border border-yellow-400 text-yellow-400 rounded-lg hover:bg-yellow-400/10 focus:outline-none transition-colors duration-200 disabled:opacity-50"
              >
                Cancel
              </button>
              
              <button
                onClick={onConfirm}
                disabled={isLoading}
                className={`px-8 py-2 text-black font-semibold rounded-lg focus:outline-none transition-all duration-200 ${
                  isLoading 
                    ? 'bg-yellow-300/70 cursor-not-allowed' 
                    : 'bg-yellow-400 hover:bg-yellow-300 shadow-lg'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    <span>Confirming...</span>
                  </div>
                ) : (
                  'Confirm & Register'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Helper component for displaying details
const DetailItem = ({ label, value, highlight = false, fullWidth = false }) => (
  <div className={`flex flex-col ${fullWidth ? 'lg:col-span-3' : ''}`}>
    <span className="font-medium text-gray-500">{label}:</span>
    <span className={highlight ? 'font-semibold text-white' : 'text-gray-300'}>{value}</span>
  </div>
);

export default ConfirmationPopup;
