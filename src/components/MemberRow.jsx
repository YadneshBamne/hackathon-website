import React from 'react';

const MemberRow = ({ 
  member, 
  index, 
  onInputChange, 
  onRemove, 
  emailError,
  showRemoveButton = false 
}) => {
  // Division options
  const divisionOptions = ['A', 'B', 'C'];
  
  // Year options
  const yearOptions = ['SE', 'TE', 'BE'];

  return (
    <div className="mb-5 border border-gray-300 p-4 rounded-lg relative">
      {/* Member Header with Remove Button */}
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-lg font-semibold text-gray-800 m-0">
          Member {index + 1}
        </h4>
        {showRemoveButton && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="bg-red-600 hover:bg-red-700 text-white border-none rounded px-3 py-1.5 text-sm font-bold cursor-pointer transition-colors duration-200"
            title="Remove member"
          >
            Remove
          </button>
        )}
      </div>

      {/* Input Fields */}
      <div className="flex gap-2.5 flex-wrap">
        <input 
          type="text" 
          placeholder="Name *" 
          value={member.name} 
          onChange={(e) => onInputChange(index, 'name', e.target.value)} 
          className="flex-1 min-w-[120px] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        
        <input 
          type="text" 
          placeholder="Moodle ID *" 
          value={member.moodle_id} 
          onChange={(e) => onInputChange(index, 'moodle_id', e.target.value)} 
          className="flex-1 min-w-[120px] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        
        <input 
          type="text" 
          placeholder="Location" 
          value={member.location} 
          onChange={(e) => onInputChange(index, 'location', e.target.value)} 
          className="flex-1 min-w-[120px] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        
        <select 
          value={member.year} 
          onChange={(e) => onInputChange(index, 'year', e.target.value)}
          className="flex-1 min-w-[120px] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="">Select Year</option>
          {yearOptions.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        
        <input 
          type="tel" 
          placeholder="Phone" 
          value={member.phone} 
          onChange={(e) => onInputChange(index, 'phone', e.target.value)} 
          className="flex-1 min-w-[120px] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        
        <select 
          value={member.div} 
          onChange={(e) => onInputChange(index, 'div', e.target.value)}
          className="flex-1 min-w-[120px] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="">Select Division</option>
          {divisionOptions.map((div) => (
            <option key={div} value={div}>
              {div}
            </option>
          ))}
        </select>
        
        <input 
          type="email" 
          placeholder="Email" 
          value={member.email_id} 
          onChange={(e) => onInputChange(index, 'email_id', e.target.value)} 
          className={`flex-1 min-w-[120px] p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            emailError 
              ? 'border-2 border-red-500' 
              : 'border border-gray-300'
          }`}
        />
      </div>
      
      {/* Email error message */}
      {emailError && (
        <div className="text-red-500 text-xs mt-2 font-medium">
          {emailError}
        </div>
      )}
    </div>
  );
};

export default MemberRow;