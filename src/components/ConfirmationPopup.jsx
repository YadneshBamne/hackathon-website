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

  // Filter only filled members
  const filledMembers = members.filter(member => 
    member.name.trim() && member.moodle_id.trim()
  );

  return (
    <>
      {/* CSS Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: scale(0.9) translateY(-20px);
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
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
        {/* Modal Content */}
        <div className="popup-animation bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white px-6 py-4">
            <h2 className="text-xl font-bold flex items-center">
              <span className="text-2xl mr-3">📋</span>
              Confirm Team Registration
            </h2>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
            <div className="p-6 space-y-6">
              {/* Team Information */}
              <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-4">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Team Information</h3>
                <div className="bg-white p-3 rounded-lg">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700 w-24">Team Name:</span>
                    <span className="text-blue-600 font-semibold text-lg">{teamName}</span>
                  </div>
                </div>
              </div>

              {/* Members Information */}
              <div className="bg-green-50 border-l-4 border-green-500 rounded-r-lg p-4">
                <h3 className="text-lg font-semibold text-green-800 mb-4">
                  Team Members ({filledMembers.length})
                </h3>
                
                <div className="space-y-4">
                  {filledMembers.map((member, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-800 text-base">
                          Member {index + 1}
                        </h4>
                        <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          Complete
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-600">Name:</span>
                          <span className="text-gray-800 font-semibold">{member.name}</span>
                        </div>
                        
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-600">Moodle ID:</span>
                          <span className="text-gray-800 font-semibold">{member.moodle_id}</span>
                        </div>
                        
                        {member.location && (
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-600">Location:</span>
                            <span className="text-gray-800">{member.location}</span>
                          </div>
                        )}
                        
                        {member.year && (
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-600">Year:</span>
                            <span className="text-gray-800">{member.year}</span>
                          </div>
                        )}
                        
                        {member.phone && (
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-600">Phone:</span>
                            <span className="text-gray-800">{member.phone}</span>
                          </div>
                        )}
                        
                        {member.div && (
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-600">Division:</span>
                            <span className="text-gray-800">{member.div}</span>
                          </div>
                        )}
                        
                        {member.email_id && (
                          <div className="flex flex-col lg:col-span-2">
                            <span className="font-medium text-gray-600">Email:</span>
                            <span className="text-gray-800">{member.email_id}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Warning Note */}
              <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg p-4">
                <div className="flex items-start">
                  <span className="text-yellow-600 text-xl mr-3">⚠️</span>
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-1">Please Review Carefully</h4>
                    <p className="text-yellow-700 text-sm">
                      Once confirmed, this information will be saved to the database. 
                      Make sure all details are correct before proceeding.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
            <div className="flex justify-end space-x-3">
              <button
                onClick={onCancel}
                disabled={isLoading}
                className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              
              <button
                onClick={onConfirm}
                disabled={isLoading}
                className={`px-8 py-2 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </div>
                ) : (
                  'Confirm & Save'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationPopup;