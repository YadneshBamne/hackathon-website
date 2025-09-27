import supabase from '@/supabase/client';
import { addTeamMembers, createTeam } from '@/supabase/queries/user';
import { useState } from 'react';


const RegisterForm = () => {
  const [formStep, setFormStep] = useState(1); 
  const [teamName, setTeamName] = useState('');
  const [newTeamId, setNewTeamId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [members, setMembers] = useState(Array(4).fill({
    name: '',
    moodle_id: '',
    location: '',
    year: '',
    phone: '',
    div: ''
  }));

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
  };

  const handleMembersSubmit = async (event) => {
    event.preventDefault();
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
              <input type="text" placeholder="Name" value={member.name} onChange={(e) => handleMemberInputChange(index, 'name', e.target.value)} required />
              <input type="text" placeholder="Moodle ID" value={member.moodle_id} onChange={(e) => handleMemberInputChange(index, 'moodle_id', e.target.value)} required />
              <input type="text" placeholder="Location" value={member.location} onChange={(e) => handleMemberInputChange(index, 'location', e.target.value)} />
              <input type="text" placeholder="Year" value={member.year} onChange={(e) => handleMemberInputChange(index, 'year', e.target.value)} />
              <input type="text" placeholder="Phone" value={member.phone} onChange={(e) => handleMemberInputChange(index, 'phone', e.target.value)} />
              <input type="text" placeholder="Division" value={member.div} onChange={(e) => handleMemberInputChange(index, 'div', e.target.value)} />
            </div>
          ))}
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Adding Members...' : 'Add All Members to Team'}
          </button>
        </form>
      )}
    </div>
  );
};

export default RegisterForm;
