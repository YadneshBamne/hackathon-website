import { AlertTriangle } from "lucide-react";
import React from "react";

const ConfirmationPopup = ({
  isVisible,
  teamName,
  members,
  onConfirm,
  onCancel,
  isLoading = false,
}) => {
  if (!isVisible) return null;

  const filledMembers = members.filter(
    (member) => member.name.trim() && member.moodle_id.trim()
  );

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .popup-animation { animation: fadeIn 0.3s ease-out forwards; }
        .themed-scrollbar::-webkit-scrollbar { width: 8px; }
        .themed-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
        .themed-scrollbar::-webkit-scrollbar-thumb { background: #fbbd23; border-radius: 10px; }
        .themed-scrollbar::-webkit-scrollbar-thumb:hover { background: #fca510; }
      `}</style>

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
        {/* MODIFIED: Added 'flex flex-col' to make this a flex container */}
        <div className="popup-animation flex w-full max-w-4xl max-h-[90vh] flex-col overflow-hidden rounded-xl border border-yellow-400/30 bg-black/90 shadow-2xl">
          {/* Header (will not grow or shrink) */}
          <div className="border-b border-yellow-400/30 px-6 py-4 text-yellow-400">
            <h2 className="flex items-center font-starjout text-xl font-bold">
              Confirm Registration
            </h2>
          </div>
          <div className="mx-6 mt-4 mb-2 flex items-start gap-4 rounded-lg border border-yellow-500 bg-yellow-400/20 px-6 py-4">
            <div className="flex-shrink-0">
              <AlertTriangle className="mt-2 h-6 w-6 text-yellow-400" />
            </div>
            <div className="flex-grow">
              <p className="font-bold text-yellow-200">
                Important: Registration Details Are Final
              </p>
              <p className="text-sm text-yellow-300/80">
                Once confirmed, details cannot be changed. The names provided
                will be printed on your certificate.
              </p>
            </div>
          </div>

          {/* MODIFIED: Removed max-h and added 'flex-1' to make it fill available space */}
          <div className="flex-1 space-y-6 overflow-y-auto p-6 themed-scrollbar">
            {/* Team Information */}
            <div className="rounded-lg border border-yellow-400/20 bg-black/30 p-4">
              <h3 className="mb-3 text-lg font-semibold text-yellow-400">
                Team Information
              </h3>
              <div className="flex items-center">
                <span className="w-28 font-medium text-gray-400">
                  Team Name:
                </span>
                <span className="text-lg font-semibold text-white">
                  {teamName}
                </span>
              </div>
            </div>

            {/* Members Information */}
            <div className="rounded-lg border border-yellow-400/20 bg-black/30 p-4">
              <h3 className="mb-4 text-lg font-semibold text-yellow-400">
                Team Members to be Registered ({filledMembers.length})
              </h3>
              <div className="space-y-4">
                {filledMembers.map((member, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-gray-700/50 bg-gray-900/50 p-4"
                  >
                    <h4 className="mb-3 text-base font-semibold text-gray-200">
                      Member {index + 1}
                    </h4>
                    <div className="grid grid-cols-1 gap-y-2 gap-x-4 text-sm md:grid-cols-2 lg:grid-cols-3">
                      <DetailItem label="Full Name" value={member.name} highlight />
                      <DetailItem label="Moodle ID" value={member.moodle_id} highlight />
                      {member.location && (<DetailItem label="Location" value={member.location} />)}
                      {member.year && <DetailItem label="Year" value={member.year} />}
                      {member.phone && <DetailItem label="Phone" value={member.phone} />}
                      {member.div && <DetailItem label="Division" value={member.div} />}
                      {member.email_id && (<DetailItem label="Email" value={member.email_id} fullWidth />)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer (will not grow or shrink) */}
          <div className="border-t border-yellow-400/30 bg-black/50 px-6 py-4">
            <div className="flex justify-end space-x-3">
              <button
                onClick={onCancel}
                disabled={isLoading}
                className="rounded-lg border border-yellow-400 bg-transparent px-6 py-2 text-yellow-400 transition-colors duration-200 hover:bg-yellow-400/10 focus:outline-none disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={isLoading}
                className={`rounded-lg px-8 py-2 font-semibold text-black transition-all duration-200 focus:outline-none ${
                  isLoading
                    ? "cursor-not-allowed bg-yellow-300/70"
                    : "bg-yellow-400 shadow-lg hover:bg-yellow-300"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
                    <span>Confirming...</span>
                  </div>
                ) : (
                  "Confirm & Register"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const DetailItem = ({ label, value, highlight = false, fullWidth = false }) => (
  <div className={`flex flex-col ${fullWidth ? "lg:col-span-3" : ""}`}>
    <span className="font-medium text-gray-500">{label}:</span>
    <span className={highlight ? "font-semibold text-white" : "text-gray-300"}>
      {value}
    </span>
  </div>
);

export default ConfirmationPopup;
