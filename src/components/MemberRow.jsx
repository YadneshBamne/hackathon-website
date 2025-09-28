import React from "react";

const MemberRow = ({ member, index, onInputChange, emailError }) => {
  const divisionOptions = ["A", "B", "C"];
  const yearOptions = ["SE", "TE", "BE"];

  const inputStyle = `w-full p-3 rounded-lg bg-gray-900/70 text-gray-200 placeholder-gray-500 border border-yellow-400/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300`;

  return (
    <div className="mb-6 rounded-lg border border-yellow-500/30 bg-black/30 p-5 backdrop-blur-sm shadow-lg relative hover:shadow-yellow-500/20 transition-all duration-300">
      <div className="flex justify-between items-center mb-5">
        <h4 className="text-xl font-semibold text-yellow-400 m-0 font-starjout">
          Member {index + 1}{" "}
          {index === 0 && (
            <span className="text-base text-yellow-200">(Team Leader)</span>
          )}
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Full Name*"
          value={member.name}
          onChange={(e) => onInputChange(index, "name", e.target.value)}
          className={inputStyle}
        />

        <input
          type="text"
          placeholder="Moodle ID*"
          value={member.moodle_id}
          onChange={(e) => onInputChange(index, "moodle_id", e.target.value)}
          className={inputStyle}
        />

        <input
          type="text"
          placeholder="Location*"
          value={member.location}
          onChange={(e) => onInputChange(index, "location", e.target.value)}
          className={inputStyle}
        />

        <select
          value={member.year}
          onChange={(e) => onInputChange(index, "year", e.target.value)}
          className={inputStyle}
        >
          <option value="" disabled>
            Select Year*
          </option>
          {yearOptions.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select
          value={member.div}
          onChange={(e) => onInputChange(index, "div", e.target.value)}
          className={inputStyle}
        >
          <option value="" disabled>
            Select Division*
          </option>
          {divisionOptions.map((div) => (
            <option key={div} value={div}>
              {div}
            </option>
          ))}
        </select>

        <input
          type="tel"
          placeholder="Phone*"
          value={member.phone}
          onChange={(e) => onInputChange(index, "phone", e.target.value)}
          className={inputStyle}
        />

        <div className="lg:col-span-3">
          <input
            type="email"
            placeholder="College Email*"
            value={member.email_id}
            onChange={(e) => onInputChange(index, "email_id", e.target.value)}
            className={`${inputStyle} ${
              emailError ? "border-red-500 ring-red-500" : ""
            }`}
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
