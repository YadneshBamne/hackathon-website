// Create a new team
export const createTeam = async (supabase, teamName, moodleId = null, location = null, year = null) => {
  const { data, error } = await supabase
    .from("teams")
    .insert([{ 
      team_name: teamName,
      moodle_id: moodleId,
      location: location,
      year: year
    }])
    .select()
    .single();

  if (error) {
    console.error("Error creating team:", error.message);
  }

  return { data, error };
};

// Add team members with email support
export const addTeamMembers = async (supabase, team_id, members) => {
  if (!team_id) {
    return { data: null, error: new Error("team_id is required.") };
  }

  const recordsToInsert = members.map((member) => ({
    name: member.name,
    moodle_id: member.moodle_id,
    location: member.location,
    year: member.year,
    phone: member.phone,
    div: member.div,
    email_id: member.email_id, // Email field included
    team_id: team_id,
  }));

  const { data, error } = await supabase
    .from("members")
    .insert(recordsToInsert)
    .select();

  if (error) {
    console.error("Error inserting members:", error.message);
  }

  return { data, error };
};

// Get all teams
export const getAllTeams = async (supabase) => {
  const { data, error } = await supabase
    .from("teams")
    .select("*")
    .order("team_name", { ascending: true });

  if (error) {
    console.error("Error fetching teams:", error.message);
  }

  return { data, error };
};

// Get a specific team by name
export const getTeamByName = async (supabase, teamName) => {
  if (!teamName) {
    return { data: null, error: new Error("Team name is required.") };
  }

  const { data, error } = await supabase
    .from("teams")
    .select("*")
    .eq("team_name", teamName.trim())
    .single();

  if (error) {
    console.error("Error fetching team:", error.message);
  }

  return { data, error };
};

// Get team with all its members
export const getTeamWithMembers = async (supabase, teamName) => {
  if (!teamName) {
    return { data: null, error: new Error("Team name is required.") };
  }

  const { data, error } = await supabase
    .from("teams")
    .select(`
      *,
      members (
        id,
        name,
        moodle_id,
        location,
        year,
        phone,
        div,
        email_id
      )
    `)
    .eq("team_name", teamName.trim())
    .single();

  if (error) {
    console.error("Error fetching team with members:", error.message);
  }

  return { data, error };
};

// Get team by ID with members
export const getTeamById = async (supabase, teamId) => {
  if (!teamId) {
    return { data: null, error: new Error("Team ID is required.") };
  }

  const { data, error } = await supabase
    .from("teams")
    .select(`
      *,
      members (
        id,
        name,
        moodle_id,
        location,
        year,
        phone,
        div,
        email_id
      )
    `)
    .eq("id", teamId)
    .single();

  if (error) {
    console.error("Error fetching team by ID:", error.message);
  }

  return { data, error };
};

// Update team details
export const updateTeam = async (supabase, teamName, updates) => {
  if (!teamName) {
    return { data: null, error: new Error("Team name is required.") };
  }

  if (!updates || Object.keys(updates).length === 0) {
    return { data: null, error: new Error("No updates provided.") };
  }

  // Check if team exists first
  const { data: existingTeam, error: findError } = await supabase
    .from("teams")
    .select("team_name")
    .eq("team_name", teamName.trim())
    .single();

  if (findError || !existingTeam) {
    return { data: null, error: new Error("Team not found.") };
  }

  const { data, error } = await supabase
    .from("teams")
    .update(updates)
    .eq("team_name", teamName.trim())
    .select()
    .single();

  if (error) {
    console.error("Error updating team:", error.message);
  }

  return { data, error };
};

// Update team by ID
export const updateTeamById = async (supabase, teamId, updates) => {
  if (!teamId) {
    return { data: null, error: new Error("Team ID is required.") };
  }

  if (!updates || Object.keys(updates).length === 0) {
    return { data: null, error: new Error("No updates provided.") };
  }

  const { data, error } = await supabase
    .from("teams")
    .update(updates)
    .eq("id", teamId)
    .select()
    .single();

  if (error) {
    console.error("Error updating team:", error.message);
  }

  return { data, error };
};

// Delete team by name (will also delete associated members due to foreign key constraint)
export const deleteTeam = async (supabase, teamName) => {
  if (!teamName) {
    return { data: null, error: new Error("Team name is required.") };
  }

  // Check if team exists first
  const { data: existingTeam, error: findError } = await supabase
    .from("teams")
    .select("id, team_name")
    .eq("team_name", teamName.trim())
    .single();

  if (findError || !existingTeam) {
    return { data: null, error: new Error("Team not found.") };
  }

  // Delete team (members will be deleted automatically due to cascade)
  const { data, error } = await supabase
    .from("teams")
    .delete()
    .eq("team_name", teamName.trim())
    .select();

  if (error) {
    console.error("Error deleting team:", error.message);
  }

  return { data, error };
};

// Delete team by ID
export const deleteTeamById = async (supabase, teamId) => {
  if (!teamId) {
    return { data: null, error: new Error("Team ID is required.") };
  }

  const { data, error } = await supabase
    .from("teams")
    .delete()
    .eq("id", teamId)
    .select();

  if (error) {
    console.error("Error deleting team:", error.message);
  }

  return { data, error };
};

// Get all members of a specific team
export const getTeamMembers = async (supabase, teamName) => {
  if (!teamName) {
    return { data: null, error: new Error("Team name is required.") };
  }

  // First get the team ID
  const { data: team, error: teamError } = await supabase
    .from("teams")
    .select("id")
    .eq("team_name", teamName.trim())
    .single();

  if (teamError || !team) {
    return { data: null, error: new Error("Team not found.") };
  }

  // Then get all members
  const { data, error } = await supabase
    .from("members")
    .select("*")
    .eq("team_id", team.id)
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching team members:", error.message);
  }

  return { data, error };
};

// Update member details
export const updateMember = async (supabase, memberId, updates) => {
  if (!memberId) {
    return { data: null, error: new Error("Member ID is required.") };
  }

  if (!updates || Object.keys(updates).length === 0) {
    return { data: null, error: new Error("No updates provided.") };
  }

  const { data, error } = await supabase
    .from("members")
    .update(updates)
    .eq("id", memberId)
    .select()
    .single();

  if (error) {
    console.error("Error updating member:", error.message);
  }

  return { data, error };
};

// Delete a member
export const deleteMember = async (supabase, memberId) => {
  if (!memberId) {
    return { data: null, error: new Error("Member ID is required.") };
  }

  const { data, error } = await supabase
    .from("members")
    .delete()
    .eq("id", memberId)
    .select();

  if (error) {
    console.error("Error deleting member:", error.message);
  }

  return { data, error };
};

// Delete team by name with cascade delete of members
export const deleteTeamByName = async (supabase, teamName) => {
  if (!teamName || teamName.trim() === '') {
    return { data: null, error: new Error("Team name is required.") };
  }

  // Check if team exists and get team details
  const { data: team, error: findError } = await supabase
    .from("teams")
    .select("id, team_name")
    .eq("team_name", teamName.trim())
    .single();

  if (findError || !team) {
    return { data: null, error: new Error("Team not found.") };
  }

  // Get count of members before deletion for info
  const { data: members, error: membersError } = await supabase
    .from("members")
    .select("id")
    .eq("team_id", team.id);

  if (membersError) {
    return { data: null, error: new Error(`Error checking team members: ${membersError.message}`) };
  }

  const memberCount = members ? members.length : 0;

  // Delete all members first
  if (memberCount > 0) {
    const { error: deleteMembersError } = await supabase
      .from("members")
      .delete()
      .eq("team_id", team.id);

    if (deleteMembersError) {
      return { data: null, error: new Error(`Error deleting team members: ${deleteMembersError.message}`) };
    }
  }

  // Delete the team
  const { data, error } = await supabase
    .from("teams")
    .delete()
    .eq("team_name", teamName.trim())
    .select();

  if (error) {
    console.error("Error deleting team:", error.message);
    return { data: null, error };
  }

  return { 
    data: data[0], 
    error: null, 
    message: `Team '${teamName}' and its ${memberCount} members deleted successfully`,
    deletedMembers: memberCount
  };
};

// Update team member details
export const updateTeamMember = async (supabase, memberId, memberUpdates) => {
  if (!memberId) {
    return { data: null, error: new Error("Member ID is required.") };
  }

  if (!memberUpdates || Object.keys(memberUpdates).length === 0) {
    return { data: null, error: new Error("No updates provided.") };
  }

  // Validate email format if email is being updated
  if (memberUpdates.email_id && memberUpdates.email_id.trim() !== '') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(memberUpdates.email_id)) {
      return { data: null, error: new Error("Invalid email format.") };
    }
  }

  // Check if member exists first
  const { data: existingMember, error: findError } = await supabase
    .from("members")
    .select("id, name")
    .eq("id", memberId)
    .single();

  if (findError || !existingMember) {
    return { data: null, error: new Error("Member not found.") };
  }

  // Prepare the update object with only valid fields
  const allowedFields = ['name', 'moodle_id', 'location', 'year', 'phone', 'div', 'email_id'];
  const filteredUpdates = {};
  
  Object.keys(memberUpdates).forEach(key => {
    if (allowedFields.includes(key)) {
      filteredUpdates[key] = memberUpdates[key];
    }
  });

  if (Object.keys(filteredUpdates).length === 0) {
    return { data: null, error: new Error("No valid update fields provided.") };
  }

  const { data, error } = await supabase
    .from("members")
    .update(filteredUpdates)
    .eq("id", memberId)
    .select(`
      *,
      teams (
        id,
        team_name
      )
    `)
    .single();

  if (error) {
    console.error("Error updating team member:", error.message);
    return { data: null, error };
  }

  return { 
    data, 
    error: null, 
    message: `Member '${data.name}' updated successfully`
  };
};

// Update multiple team members at once
export const updateMultipleTeamMembers = async (supabase, memberUpdates) => {
  if (!memberUpdates || !Array.isArray(memberUpdates) || memberUpdates.length === 0) {
    return { data: null, error: new Error("Member updates array is required.") };
  }

  const results = [];
  const errors = [];

  for (const update of memberUpdates) {
    if (!update.id) {
      errors.push({ error: "Member ID is required for update", update });
      continue;
    }

    const { data, error } = await updateTeamMember(supabase, update.id, update);
    
    if (error) {
      errors.push({ error: error.message, memberId: update.id });
    } else {
      results.push(data);
    }
  }

  return {
    data: results,
    errors: errors.length > 0 ? errors : null,
    successCount: results.length,
    errorCount: errors.length,
    message: `Updated ${results.length} members successfully${errors.length > 0 ? `, ${errors.length} failed` : ''}`
  };
};

// Get member by ID with team info
export const getMemberById = async (supabase, memberId) => {
  if (!memberId) {
    return { data: null, error: new Error("Member ID is required.") };
  }

  const { data, error } = await supabase
    .from("members")
    .select(`
      *,
      teams (
        id,
        team_name,
        moodle_id,
        location,
        year
      )
    `)
    .eq("id", memberId)
    .single();

  if (error) {
    console.error("Error fetching member:", error.message);
  }

  return { data, error };
};