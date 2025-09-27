import supabase from '@/supabase/client';
import { addTeamMembers, createTeam } from '@/supabase/queries/user';
import { useState } from 'react';

const RegisterForm = () => {
  const [formStep, setFormStep] = useState(1); 
  const [teamName, setTeamName] = useState('');
  const [newTeamId, setNewTeamId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [emailErrors, setEmailErrors] = useState(Array(4).fill(''));
  
  const [members, setMembers] = useState(Array(4).fill({
    name: '',
    moodle_id: '',
    location: '',
    year: '',
    phone: '',
    div: '',
    email_id: ''
  }));

  // Division options
  const divisionOptions = ['A', 'B', 'C'];
  
  // Year options
  const yearOptions = ['SE', 'TE', 'BE'];

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleTeamSubmit = async (event) => {
    event.preventDefault();
    if (!teamName.trim()) {
      alert('Please enter a team name.');
      return;
    }
    setIsLoading(true);

    const { data, error } = await createTeam(supabase, teamName);

    if (error) {
      alert(`Error creating team: ${error.message}`);
    } else {
      setNewTeamId(data.id); 
      setFormStep(2);       
    }
    setIsLoading(false);
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

  const handleMembersSubmit = async (event) => {
    event.preventDefault();
    
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

    // Check for required fields
    const requiredFieldsValid = members.every(member => 
      member.name.trim() && member.moodle_id.trim()
    );

    if (!requiredFieldsValid) {
      alert('Please fill in all required fields (Name and Moodle ID) for all members.');
      return;
    }

    setIsLoading(true);
    
    const { data, error } = await addTeamMembers(supabase, newTeamId, members);

    if (error) {
      alert(`Error adding members: ${error.message}`);
    } else {
      alert('Team and members registered successfully!');
      console.log('Inserted members:', data);
    }
    setIsLoading(false);
  };

  return (
    <div>
      {formStep === 1 && (
        <form onSubmit={handleTeamSubmit}>
          <h2>Step 1: Create Your Team</h2>
          <div>
            <label htmlFor="teamName">Team Name</label>
            <input
              id="teamName"
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter your team's name"
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Team'}
          </button>
        </form>
      )}

      {formStep === 2 && (
        <form onSubmit={handleMembersSubmit}>
          <h2>Step 2: Add Members to "{teamName}"</h2>
          {members.map((member, index) => (
            <div key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
              <h3>Member {index + 1}</h3>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <input 
                  type="text" 
                  placeholder="Name" 
                  value={member.name} 
                  onChange={(e) => handleMemberInputChange(index, 'name', e.target.value)} 
                  required 
                  style={{ flex: '1', minWidth: '120px' }}
                />
                
                <input 
                  type="text" 
                  placeholder="Moodle ID" 
                  value={member.moodle_id} 
                  onChange={(e) => handleMemberInputChange(index, 'moodle_id', e.target.value)} 
                  required 
                  style={{ flex: '1', minWidth: '120px' }}
                />
                
                <input 
                  type="text" 
                  placeholder="Location" 
                  value={member.location} 
                  onChange={(e) => handleMemberInputChange(index, 'location', e.target.value)} 
                  style={{ flex: '1', minWidth: '120px' }}
                />
                
                <select 
                  value={member.year} 
                  onChange={(e) => handleMemberInputChange(index, 'year', e.target.value)}
                  style={{ flex: '1', minWidth: '120px', padding: '8px' }}
                >
                  <option value="">Year</option>
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
                  onChange={(e) => handleMemberInputChange(index, 'phone', e.target.value)} 
                  style={{ flex: '1', minWidth: '120px' }}
                />
                
                <select 
                  value={member.div} 
                  onChange={(e) => handleMemberInputChange(index, 'div', e.target.value)}
                  style={{ flex: '1', minWidth: '120px', padding: '8px' }}
                >
                  <option value="">Division</option>
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
                  onChange={(e) => handleMemberInputChange(index, 'email_id', e.target.value)} 
                  style={{ 
                    flex: '1', 
                    minWidth: '120px',
                    borderColor: emailErrors[index] ? 'red' : '#ccc'
                  }}
                />
              </div>
              
              {/* Email error message */}
              {emailErrors[index] && (
                <div style={{ 
                  color: 'red', 
                  fontSize: '12px', 
                  marginTop: '8px' 
                }}>
                  {emailErrors[index]}
                </div>
              )}
            </div>
          ))}
          
          <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
            * Required fields
          </div>
          
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Adding Members...' : 'Add All Members to Team'}
          </button>
        </form>
      )}
    </div>
  );
};

export default RegisterForm;