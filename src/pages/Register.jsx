import supabase from '@/supabase/client';
import { addTeamMembers, createTeam } from '@/supabase/queries/user';
import { useState } from 'react';
import TeamNameErrorPopup from '@/components/teamerror';
import MemberRow from '@/components/MemberRow'; // Adjust path as needed
import ConfirmationPopup from '@/components/ConfirmationPopup'; // Adjust path as needed

const RegisterForm = () => {
  const [teamName, setTeamName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTeamNameError, setShowTeamNameError] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Initialize with 3 members by default
  const [members, setMembers] = useState(Array(3).fill(null).map(() => ({
    name: '',
    moodle_id: '',
    location: '',
    year: '',
    phone: '',
    div: '',
    email_id: ''
  })));
  
  // Email errors state - dynamic based on members length
  const [emailErrors, setEmailErrors] = useState(Array(3).fill(''));

  // Constants
  const MIN_MEMBERS = 3;
  const MAX_MEMBERS = 6;

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const closeTeamNameErrorPopup = () => {
    setShowTeamNameError(false);
    // Focus back on team name input for better UX
    setTimeout(() => {
      document.getElementById('teamName')?.focus();
    }, 100);
  };

  const handleMemberInputChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setMembers(updatedMembers);

    // Validate email if the field being changed is email_id
    if (field === 'email_id') {
      const updatedEmailErrors = [...emailErrors];
      if (value && !validateEmail(value)) {
        updatedEmailErrors[index] = 'Please enter a valid email address';
      } else {
        updatedEmailErrors[index] = '';
      }
      setEmailErrors(updatedEmailErrors);
    }
  };

  const addMember = () => {
    if (members.length < MAX_MEMBERS) {
      const newMember = {
        name: '',
        moodle_id: '',
        location: '',
        year: '',
        phone: '',
        div: '',
        email_id: ''
      };
      setMembers([...members, newMember]);
      setEmailErrors([...emailErrors, '']);
    }
  };

  const removeMember = (indexToRemove) => {
    if (members.length > MIN_MEMBERS) {
      const updatedMembers = members.filter((_, index) => index !== indexToRemove);
      const updatedEmailErrors = emailErrors.filter((_, index) => index !== indexToRemove);
      setMembers(updatedMembers);
      setEmailErrors(updatedEmailErrors);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    // Validate team name
    if (!teamName.trim()) {
      alert('Please enter a team name.');
      return;
    }
    
    // Validate all emails before submission
    let hasEmailErrors = false;
    const updatedEmailErrors = [...emailErrors];
    
    members.forEach((member, index) => {
      if (member.email_id && !validateEmail(member.email_id)) {
        updatedEmailErrors[index] = 'Please enter a valid email address';
        hasEmailErrors = true;
      } else {
        updatedEmailErrors[index] = '';
      }
    });
    
    setEmailErrors(updatedEmailErrors);
    
    if (hasEmailErrors) {
      alert('Please fix email format errors before submitting.');
      return;
    }

    // Check for required fields (at least one member with name and moodle_id)
    const filledMembers = members.filter(member => 
      member.name.trim() && member.moodle_id.trim()
    );

    if (filledMembers.length === 0) {
      alert('Please fill in at least one member with Name and Moodle ID.');
      return;
    }

    // Show confirmation popup instead of directly submitting
    setShowConfirmation(true);
  };

  const handleConfirmSubmission = async () => {
    // Get filled members again for submission
    const filledMembers = members.filter(member => 
      member.name.trim() && member.moodle_id.trim()
    );

    setIsLoading(true);
    
    try {
      // Step 1: Create the team
      const { data: teamData, error: teamError } = await createTeam(supabase, teamName);
      
      if (teamError) {
        // Check if it's a unique constraint violation (team name already exists)
        if (teamError.code === '23505' || teamError.message.toLowerCase().includes('unique') || teamError.message.toLowerCase().includes('duplicate')) {
          setShowTeamNameError(true);
          setShowConfirmation(false);
          setIsLoading(false);
          return;
        }
        throw new Error(`Error creating team: ${teamError.message}`);
      }
      
      // Step 2: Add members to the team (only the filled ones)
      const { data: membersData, error: membersError } = await addTeamMembers(
        supabase, 
        teamData.id, 
        filledMembers
      );
      
      if (membersError) {
        throw new Error(`Error adding members: ${membersError.message}`);
      }
      
      alert('Team and members registered successfully!');
      console.log('Created team:', teamData);
      console.log('Inserted members:', membersData);
      
      // Reset form to initial state (3 members)
      setTeamName('');
      setShowTeamNameError(false);
      setShowConfirmation(false);
      setMembers(Array(3).fill(null).map(() => ({
        name: '',
        moodle_id: '',
        location: '',
        year: '',
        phone: '',
        div: '',
        email_id: ''
      })));
      setEmailErrors(Array(3).fill(''));
      
    } catch (error) {
      alert(error.message);
      console.error('Registration error:', error);
      setShowConfirmation(false);
    }
    
    setIsLoading(false);
  };

  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-5">
      <TeamNameErrorPopup
        isVisible={showTeamNameError}
        teamName={teamName}
        onClose={closeTeamNameErrorPopup}
        inputId="teamName"
      />

      <ConfirmationPopup
        isVisible={showConfirmation}
        teamName={teamName}
        members={members}
        onConfirm={handleConfirmSubmission}
        onCancel={handleCancelConfirmation}
        isLoading={isLoading}
      />

      <form onSubmit={handleFormSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Team Registration</h2>
        
        {/* Team Name Section */}
        <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Team Information</h3>
          <div>
            <label htmlFor="teamName" className="block text-sm font-medium text-gray-700 mb-2">
              Team Name *
            </label>
            <input
              id="teamName"
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter your team's name"
              required
              className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                showTeamNameError 
                  ? 'border-2 border-red-500' 
                  : 'border border-gray-300'
              }`}
            />
            {showTeamNameError && (
              <div className="text-red-500 text-xs mt-1 font-medium">
                This team name is already taken
              </div>
            )}
          </div>
        </div>

        {/* Members Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 m-0">Team Members</h3>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 font-medium">
                {members.length}/{MAX_MEMBERS} members
              </span>
              {members.length < MAX_MEMBERS && (
                <button
                  type="button"
                  onClick={addMember}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 flex items-center space-x-2"
                >
                  <span>+</span>
                  <span>Add Member</span>
                </button>
              )}
            </div>
          </div>
          
          <div className="text-sm text-gray-600 mb-4 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
            <strong>Note:</strong> Fill in at least one member. All members with Name and Moodle ID will be added to the team.
          </div>
          
          {/* Member Rows */}
          <div className="space-y-4">
            {members.map((member, index) => (
              <MemberRow
                key={index}
                member={member}
                index={index}
                onInputChange={handleMemberInputChange}
                onRemove={removeMember}
                emailError={emailErrors[index]}
                showRemoveButton={members.length > MIN_MEMBERS}
              />
            ))}
          </div>
        </div>
        
        {/* Required Fields Note */}
        <div className="text-xs text-gray-500 bg-gray-100 p-3 rounded-lg">
          <strong>* Required fields:</strong> Team Name, and at least one member with Name and Moodle ID
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <button 
            type="submit" 
            disabled={isLoading}
            className={`px-8 py-3 text-lg font-semibold text-white rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed opacity-60' 
                : 'bg-blue-600 hover:bg-blue-700 cursor-pointer shadow-lg hover:shadow-xl'
            }`}
          >
            Review & Register Team
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;