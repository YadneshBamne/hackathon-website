import supabase from "@/supabase/client";
import { addTeamMembers, createTeam } from "@/supabase/queries/user";
import { useState } from "react";
import TeamNameErrorPopup from "@/components/teamerror";
import MemberRow from "@/components/MemberRow"; // Adjust path as needed
import ConfirmationPopup from "@/components/ConfirmationPopup"; // Adjust path as needed
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const RegisterForm = () => {
  const [teamName, setTeamName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showTeamNameError, setShowTeamNameError] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Initialize with exactly 4 members
  const [members, setMembers] = useState(
    Array(4)
      .fill(null)
      .map(() => ({
        name: "",
        moodle_id: "",
        location: "",
        year: "",
        phone: "",
        div: "",
        email_id: "",
      }))
  );

  // Email errors state for 4 members
  const [emailErrors, setEmailErrors] = useState(Array(4).fill(""));

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const closeTeamNameErrorPopup = () => {
    setShowTeamNameError(false);
    setTimeout(() => {
      document.getElementById("teamName")?.focus();
    }, 100);
  };

  const handleMemberInputChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setMembers(updatedMembers);

    if (field === "email_id") {
      const updatedEmailErrors = [...emailErrors];
      if (value && !validateEmail(value)) {
        updatedEmailErrors[index] = "Please enter a valid email address";
      } else {
        updatedEmailErrors[index] = "";
      }
      setEmailErrors(updatedEmailErrors);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!teamName.trim()) {
      alert("Please enter a team name.");
      return;
    }

    let hasEmailErrors = false;
    const updatedEmailErrors = [...emailErrors];

    members.forEach((member, index) => {
      if (member.email_id && !validateEmail(member.email_id)) {
        updatedEmailErrors[index] = "Please enter a valid email address";
        hasEmailErrors = true;
      } else {
        updatedEmailErrors[index] = "";
      }
    });

    setEmailErrors(updatedEmailErrors);

    if (hasEmailErrors) {
      alert("Please fix email format errors before submitting.");
      return;
    }

    const filledMembers = members.filter(
      (member) => member.name.trim() && member.moodle_id.trim()
    );

    if (filledMembers.length === 0) {
      alert("Please fill in at least one member with Name and Moodle ID.");
      return;
    }

    setShowConfirmation(true);
  };

  const handleConfirmSubmission = async () => {
    const filledMembers = members.filter(
      (member) => member.name.trim() && member.moodle_id.trim()
    );

    setIsLoading(true);

    try {
      const { data: teamData, error: teamError } = await createTeam(
        supabase,
        teamName
      );

      if (teamError) {
        if (
          teamError.code === "23505" ||
          teamError.message.toLowerCase().includes("unique") ||
          teamError.message.toLowerCase().includes("duplicate")
        ) {
          setShowTeamNameError(true);
          setShowConfirmation(false);
          setIsLoading(false);
          return;
        }
        throw new Error(`Error creating team: ${teamError.message}`);
      }

      const { data: membersData, error: membersError } = await addTeamMembers(
        supabase,
        teamData.id,
        filledMembers
      );

      if (membersError) {
        throw new Error(`Error adding members: ${membersError.message}`);
      }

      alert("Team and members registered successfully!");
      console.log("Created team:", teamData);
      console.log("Inserted members:", membersData);

      setTeamName("");
      setShowTeamNameError(false);
      setShowConfirmation(false);
      setMembers(
        Array(4)
          .fill(null)
          .map(() => ({
            name: "",
            moodle_id: "",
            location: "",
            year: "",
            phone: "",
            div: "",
            email_id: "",
          }))
      );
      setEmailErrors(Array(4).fill(""));
    } catch (error) {
      alert(error.message);
      console.error("Registration error:", error);
      setShowConfirmation(false);
    }

    setIsLoading(false);
  };

  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <style>
        {`
          @keyframes move-twink-back { from { background-position: 0 0; } to { background-position: -10000px 5000px; } }
          @keyframes move-clouds-back { from { background-position: 0 0; } to { background-position: 10000px 0; } }
          .stars-background { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; overflow: hidden; pointer-events: none; }
          .stars { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #000 url('https://i.imgur.com/YKY28eT.png') repeat top center; z-index: 0; }
          .twinkling { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: transparent url('https://i.imgur.com/XYMF4ca.png') repeat top center; animation: move-twink-back 200s linear infinite; z-index: 1; }
          .clouds { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: transparent url('https://i.imgur.com/mHbScrQ.png') repeat top center; animation: move-clouds-back 200s linear infinite; z-index: 2; }
        `}
      </style>
      
      <div className="stars-background">
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="clouds"></div>
      </div>
      
      <div style={{ backgroundColor: 'transparent', minHeight: '100vh', position: 'relative', zIndex: 10 }}>
        <Navbar/>
        <main className="max-w-6xl mx-auto p-5 mt-16">
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
            <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center font-starjout">
              Team Registration
            </h2>

            <div className="rounded-lg border border-yellow-400/20 bg-black/90 backdrop-blur-sm p-6">
              <h3 className="text-xl font-semibold text-yellow-400 mb-4">
                Team Information
              </h3>
              <div>
                <label htmlFor="teamName" className="block text-sm font-medium text-gray-300 mb-2">
                  Team Name *
                </label>
                <input
                  id="teamName"
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Enter your team's name"
                  required
                  className={`w-full p-3 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 ${
                    showTeamNameError ? "border-2 border-red-500" : "border border-gray-600"
                  }`}
                />
                {showTeamNameError && (
                  <div className="text-red-500 text-xs mt-1 font-medium">
                    This team name is already taken
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-lg border border-yellow-400/20 bg-black/90 backdrop-blur-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-yellow-400 m-0">
                  Team Members (4 required)
                </h3>
              </div>
              
              <div className="space-y-4">
                {members.map((member, index) => (
                  <MemberRow
                    key={index}
                    member={member}
                    index={index}
                    onInputChange={handleMemberInputChange}
                    emailError={emailErrors[index]}
                  />
                ))}
              </div>
            </div>

            <div className="text-xs text-gray-400 bg-gray-900/50 p-3 rounded-lg">
              <strong>* Required fields:</strong> Team Name, and at least one
              member with Name and Moodle ID
            </div>

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300 ${
                  isLoading
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed opacity-60"
                    : "bg-yellow-400 hover:bg-yellow-300 text-black cursor-pointer shadow-lg hover:shadow-xl"
                }`}
              >
                Review & Register Team
              </button>
            </div>
          </form>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default RegisterForm;
