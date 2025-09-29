import React from "react";
import { User, Mail, Phone, MapPin, GraduationCap, Users } from "lucide-react";

const MemberRow = ({ member, index, onInputChange, emailError }) => {
  const divisionOptions = ["A", "B", "C"];
  const yearOptions = ["SE", "TE", "BE"];

  const inputBaseStyle = `w-full p-3 pl-10 rounded-lg bg-gray-900/50 text-gray-100 placeholder-gray-500 
    border border-yellow-400/20 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 
    focus:border-yellow-400/50 focus:bg-gray-900/70 transition-all duration-300 
    hover:border-yellow-400/40 backdrop-blur-sm`;

  const selectStyle = `${inputBaseStyle} appearance-none cursor-pointer`;

  return (
    <div className="mb-6 rounded-xl border border-yellow-500/20 bg-gradient-to-br from-black/40 via-gray-900/40 to-black/40 
      p-6 backdrop-blur-md shadow-xl hover:shadow-yellow-500/10 hover:border-yellow-500/40 
      transition-all duration-500 group relative overflow-hidden">
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/5 to-yellow-500/0 
        opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      {/* Header */}
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${index === 0 ? 'bg-yellow-500/20' : 'bg-yellow-400/10'} 
              flex items-center justify-center border ${index === 0 ? 'border-yellow-500/40' : 'border-yellow-400/20'} 
              group-hover:scale-110 transition-transform duration-300`}>
              {index === 0 ? (
                <Users className="w-5 h-5 text-yellow-400" />
              ) : (
                <User className="w-5 h-5 text-yellow-300" />
              )}
            </div>
            <div>
              <h4 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 m-0">
                Member {index + 1}
              </h4>
              {index === 0 && (
                <span className="text-xs font-semibold text-yellow-300/80 tracking-wider uppercase">
                  Team Leader
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Member number badge */}
        <div className="w-8 h-8 rounded-full bg-yellow-500/10 border border-yellow-400/30 
          flex items-center justify-center text-yellow-400 font-bold text-sm">
          {index + 1}
        </div>
      </div>

      {/* Info text */}
      <div className="mb-5 pb-4 border-b border-yellow-400/10">
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-yellow-400/60 mt-0.5 flex-shrink-0" />
          <p className="text-gray-400 text-xs leading-relaxed">
            For the location field, enter your nearest station name
          </p>
        </div>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
        {/* Full Name */}
        <div className="relative group/input">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-yellow-400/50 
            group-focus-within/input:text-yellow-400 transition-colors duration-300" />
          <input
            type="text"
            placeholder="Full Name*"
            value={member.name}
            onChange={(e) => onInputChange(index, "name", e.target.value)}
            className={inputBaseStyle}
          />
        </div>

        {/* Moodle ID */}
        <div className="relative group/input">
          <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-yellow-400/50 
            group-focus-within/input:text-yellow-400 transition-colors duration-300" />
          <input
            type="text"
            placeholder="Moodle ID*"
            value={member.moodle_id}
            onChange={(e) => onInputChange(index, "moodle_id", e.target.value)}
            className={inputBaseStyle}
          />
        </div>

        {/* Location */}
        <div className="relative group/input">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-yellow-400/50 
            group-focus-within/input:text-yellow-400 transition-colors duration-300" />
          <input
            type="text"
            maxLength={30}
            placeholder="Location (Nearest Station)*"
            value={member.location}
            onChange={(e) => onInputChange(index, "location", e.target.value)}
            className={inputBaseStyle}
          />
        </div>

        {/* Year */}
        <div className="relative group/input">
          <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-yellow-400/50 
            group-focus-within/input:text-yellow-400 transition-colors duration-300 pointer-events-none z-10" />
          <select
            value={member.year}
            onChange={(e) => onInputChange(index, "year", e.target.value)}
            className={selectStyle}
          >
            <option value="" disabled>
              Select Year*
            </option>
            {yearOptions.map((year) => (
              <option key={year} value={year} className="bg-gray-900 text-gray-100">
                {year}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-yellow-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Division */}
        <div className="relative group/input">
          <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-yellow-400/50 
            group-focus-within/input:text-yellow-400 transition-colors duration-300 pointer-events-none z-10" />
          <select
            value={member.div}
            onChange={(e) => onInputChange(index, "div", e.target.value)}
            className={selectStyle}
          >
            <option value="" disabled>
              Select Division*
            </option>
            {divisionOptions.map((div) => (
              <option key={div} value={div} className="bg-gray-900 text-gray-100">
                Division {div}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-yellow-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Phone */}
        <div className="relative group/input">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-yellow-400/50 
            group-focus-within/input:text-yellow-400 transition-colors duration-300" />
          <input
            type="tel"
            placeholder="Phone Number*"
            value={member.phone}
            onChange={(e) => onInputChange(index, "phone", e.target.value)}
            className={inputBaseStyle}
          />
        </div>

        {/* Email - Full Width */}
        <div className="lg:col-span-3 relative group/input">
          <Mail className="absolute left-3 top-3 w-4 h-4 text-yellow-400/50 
            group-focus-within/input:text-yellow-400 transition-colors duration-300" />
          <input
            type="email"
            placeholder="College Email Address*"
            value={member.email_id}
            onChange={(e) => onInputChange(index, "email_id", e.target.value)}
            className={`${inputBaseStyle} ${
              emailError ? "border-red-500/50 ring-2 ring-red-500/20 focus:ring-red-500/30" : ""
            }`}
          />
          {emailError && (
            <div className="mt-2 flex items-start gap-2 text-xs font-medium text-red-400 bg-red-500/10 
              border border-red-500/20 rounded-lg p-2 animate-in fade-in slide-in-from-top-1 duration-300">
              <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{emailError}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberRow;