import React from 'react';

const MemberRow = ({ 
  member, 
  index, 
  onInputChange, 
  onRemove, 
  emailError,
  showRemoveButton = false 
}) => {
  // Options for dropdowns remain the same
  const divisionOptions = ['A', 'B', 'C'];
  const yearOptions = ['SE', 'TE', 'BE'];

  const inputStyle = `w-full p-3 rounded-lg bg-gray-900/70 text-gray-200 placeholder-gray-500 border border-yellow-400/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300`;

  return (
    <div className="mb-6 rounded-lg border border-yellow-500/30 bg-black/30 p-5 backdrop-blur-sm shadow-lg relative hover:shadow-yellow-500/20 transition-all duration-300">
      
      {/* Header with Remove Button */}
      <div className="flex justify-between items-center mb-5">
        <h4 className="text-xl font-semibold text-yellow-400 m-0 font-starjout">
          Member {index + 1}
        </h4>
        {showRemoveButton && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="bg-red-600 hover:bg-red-700 text-white rounded px-4 py-1.5 text-sm font-semibold transition-shadow duration-300 shadow-sm hover:shadow-md"
            title="Remove member"
          >
            Remove
          </button>
        )}
      </div>

      {/* Responsive Grid for Input Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <input 
          type="text" 
          placeholder="Name *" 
          value={member.name} 
          onChange={(e) => onInputChange(index, 'name', e.target.value)} 
          className={inputStyle}
        />
        
        <input 
          type="text" 
          placeholder="Moodle ID *" 
          value={member.moodle_id} 
          onChange={(e) => onInputChange(index, 'moodle_id', e.target.value)} 
          className={inputStyle}
        />
        
        <input 
          type="text" 
          placeholder="Location" 
          value={member.location} 
          onChange={(e) => onInputChange(index, 'location', e.target.value)} 
          className={inputStyle}
        />
        
        <select 
          value={member.year} 
          onChange={(e) => onInputChange(index, 'year', e.target.value)}
          className={inputStyle}
        >
          <option value="" disabled>Select Year</option>
          {yearOptions.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        
        <input 
          type="tel" 
          placeholder="Phone" 
          value={member.phone} 
          onChange={(e) => onInputChange(index, 'phone', e.target.value)} 
          className={inputStyle}
        />
        
        <select 
          value={member.div} 
          onChange={(e) => onInputChange(index, 'div', e.target.value)}
          className={inputStyle}
        >
          <option value="" disabled>Select Division</option>
          {divisionOptions.map((div) => (
            <option key={div} value={div}>{div}</option>
          ))}
        </select>
        
        <div className="lg:col-span-3">
          <input 
            type="email" 
            placeholder="Email" 
            value={member.email_id} 
            onChange={(e) => onInputChange(index, 'email_id', e.target.value)} 
            className={`${inputStyle} ${emailError ? 'border-red-500 ring-red-500' : ''}`}
          />
          {emailError && (
            <div className="mt-2 text-xs font-semibold text-red-400">
              {emailError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberRow;
