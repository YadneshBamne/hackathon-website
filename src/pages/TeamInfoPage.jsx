import React, { useState, useEffect } from 'react';
import supabase from '@/supabase/client';
import { getAllTeams, getTeamWithMembers, getTeamByName } from '@/supabase/queries/user';

const TeamsInfoPage = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [searchTeamName, setSearchTeamName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [view, setView] = useState('all'); // 'all' or 'specific'

  // Load all teams on component mount
  useEffect(() => {
    loadAllTeams();
  }, []);

  const loadAllTeams = async () => {
    setLoading(true);
    setError('');
    
    const { data, error: fetchError } = await getAllTeams(supabase);
    
    if (fetchError) {
      setError(`Error loading teams: ${fetchError.message}`);
    } else {
      setTeams(data || []);
    }
    
    setLoading(false);
  };

  const searchSpecificTeam = async () => {
    if (!searchTeamName.trim()) {
      setError('Please enter a team name to search');
      return;
    }

    setLoading(true);
    setError('');
    setSelectedTeam(null);

    const { data, error: searchError } = await getTeamWithMembers(supabase, searchTeamName.trim());
    
    if (searchError) {
      setError(`Error finding team: ${searchError.message}`);
    } else if (data) {
      setSelectedTeam(data);
    } else {
      setError('Team not found');
    }
    
    setLoading(false);
  };

  const loadTeamDetails = async (teamName) => {
    setLoading(true);
    setError('');
    setSelectedTeam(null);

    const { data, error: detailError } = await getTeamWithMembers(supabase, teamName);
    
    if (detailError) {
      setError(`Error loading team details: ${detailError.message}`);
    } else {
      setSelectedTeam(data);
      setView('specific');
    }
    
    setLoading(false);
  };

  const resetView = () => {
    setView('all');
    setSelectedTeam(null);
    setSearchTeamName('');
    setError('');
    loadAllTeams();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
        Teams Information
      </h1>

      {/* Navigation Buttons */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <button
          onClick={() => setView('all')}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            backgroundColor: view === 'all' ? '#007bff' : '#f8f9fa',
            color: view === 'all' ? 'white' : '#333',
            border: '1px solid #ddd',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          All Teams
        </button>
        <button
          onClick={() => setView('specific')}
          style={{
            padding: '10px 20px',
            backgroundColor: view === 'specific' ? '#007bff' : '#f8f9fa',
            color: view === 'specific' ? 'white' : '#333',
            border: '1px solid #ddd',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Search Team
        </button>
      </div>

      {/* Search Section */}
      {view === 'specific' && (
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '8px', 
          marginBottom: '20px' 
        }}>
          <h3>Search for Specific Team</h3>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Enter team name..."
              value={searchTeamName}
              onChange={(e) => setSearchTeamName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchSpecificTeam()}
              style={{
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                flex: 1
              }}
            />
            <button
              onClick={searchSpecificTeam}
              disabled={loading}
              style={{
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '10px',
          borderRadius: '4px',
          marginBottom: '20px',
          border: '1px solid #f5c6cb'
        }}>
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p>Loading...</p>
        </div>
      )}

      {/* All Teams View */}
      {view === 'all' && !loading && (
        <div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '20px' 
          }}>
            <h2>All Teams ({teams.length})</h2>
            <button
              onClick={loadAllTeams}
              style={{
                padding: '8px 16px',
                backgroundColor: '#17a2b8',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Refresh
            </button>
          </div>

          {teams.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666' }}>No teams found</p>
          ) : (
            <div style={{ display: 'grid', gap: '15px' }}>
              {teams.map((team) => (
                <div
                  key={team.id}
                  style={{
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '15px',
                    backgroundColor: 'white',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>{team.team_name}</h3>
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        {team.moodle_id && <span>Moodle ID: {team.moodle_id} | </span>}
                        {team.location && <span>Location: {team.location} | </span>}
                        {team.year && <span>Year: {team.year}</span>}
                      </div>
                    </div>
                    <button
                      onClick={() => loadTeamDetails(team.team_name)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Specific Team Details */}
      {selectedTeam && (
        <div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '20px' 
          }}>
            <h2>Team Details: {selectedTeam.team_name}</h2>
            <button
              onClick={resetView}
              style={{
                padding: '8px 16px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Back to All Teams
            </button>
          </div>

          <div style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '20px',
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginBottom: '20px'
          }}>
            <h3 style={{ marginTop: '0', color: '#333' }}>Team Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              <div>
                <strong>Team Name:</strong> {selectedTeam.team_name}
              </div>
              {selectedTeam.moodle_id && (
                <div>
                  <strong>Moodle ID:</strong> {selectedTeam.moodle_id}
                </div>
              )}
              {selectedTeam.location && (
                <div>
                  <strong>Location:</strong> {selectedTeam.location}
                </div>
              )}
              {selectedTeam.year && (
                <div>
                  <strong>Year:</strong> {selectedTeam.year}
                </div>
              )}
            </div>
          </div>

          {/* Team Members */}
          <div>
            <h3>Team Members ({selectedTeam.members?.length || 0})</h3>
            {!selectedTeam.members || selectedTeam.members.length === 0 ? (
              <p style={{ color: '#666', fontStyle: 'italic' }}>No members found for this team</p>
            ) : (
              <div style={{ display: 'grid', gap: '10px' }}>
                {selectedTeam.members.map((member, index) => (
                  <div
                    key={member.id}
                    style={{
                      border: '1px solid #e9ecef',
                      borderRadius: '6px',
                      padding: '15px',
                      backgroundColor: '#f8f9fa'
                    }}
                  >
                    <h4 style={{ margin: '0 0 10px 0', color: '#495057' }}>
                      Member {index + 1}: {member.name}
                    </h4>
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                      gap: '10px',
                      fontSize: '14px'
                    }}>
                      {member.moodle_id && <div><strong>Moodle ID:</strong> {member.moodle_id}</div>}
                      {member.email_id && <div><strong>Email:</strong> {member.email_id}</div>}
                      {member.phone && <div><strong>Phone:</strong> {member.phone}</div>}
                      {member.location && <div><strong>Location:</strong> {member.location}</div>}
                      {member.year && <div><strong>Year:</strong> {member.year}</div>}
                      {member.div && <div><strong>Division:</strong> {member.div}</div>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamsInfoPage;