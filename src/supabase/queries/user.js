export const createTeam = async (supabase, teamName) => {
  const { data, error } = await supabase
    .from("teams")
    .insert([{ team_name: teamName }])
    .select()
    .single();

  if (error) {
    console.error("Error creating team:", error.message);
  }

  return { data, error };
};

export const addTeamMembers = async (supabase, team_id, members) => {
  if (!team_id) {
    return { data: null, error: new Error("team_id is required.") };
  }

  const recordsToInsert = members.map((member) => ({
    ...member,
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
