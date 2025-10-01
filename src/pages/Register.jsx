import supabase from "@/supabase/client";
import { addTeamMembers, createTeam } from "@/supabase/queries/user";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

  const [members, setMembers] = useState(
    Array(4)
      .fill(null)
      .map(() => ({
        name: "",
        moodle_id: "",
        location: "",
        year: "",
        div: "",
        phone: "",
        email_id: "",
      }))
  );

  const [emailErrors, setEmailErrors] = useState(Array(4).fill(""));

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
      toast.error("Please enter a team name.");
      return;
    }

    let hasEmailErrors = false;
    const updatedEmailErrors = members.map((member) => {
      if (member.email_id && !validateEmail(member.email_id)) {
        hasEmailErrors = true;
        return "Please enter a valid email address";
      }
      return "";
    });

    setEmailErrors(updatedEmailErrors);

    if (hasEmailErrors) {
      toast.error("Please fix email format errors before submitting.");
      return;
    }

    const allMembersComplete = members.every(
      (member) =>
        member.name.trim() &&
        member.moodle_id.trim() &&
        member.location.trim() &&
        member.year &&
        member.div &&
        member.phone.trim() &&
        member.email_id.trim()
    );

    if (!allMembersComplete) {
      toast.warn(
        "Please fill in all details for all 4 members before submission."
      );
      return;
    }

    setShowConfirmation(true);
  };

  const handleConfirmSubmission = async () => {
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
          toast.error("This team name is already taken.");
          return;
        }
        throw new Error(`Error creating team: ${teamError.message}`);
      }

      const { data: membersData, error: membersError } = await addTeamMembers(
        supabase,
        teamData.id,
        members
      );

      if (membersError) {
        throw new Error(`Error adding members: ${membersError.message}`);
      }

      toast.success("Team and members registered successfully!");

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
            div: "",
            phone: "",
            email_id: "",
          }))
      );
      setEmailErrors(Array(4).fill(""));
    } catch (error) {
      toast.error(error.message);
      setShowConfirmation(false);
      console.error("Registration error:", error);
    }

    setIsLoading(false);
  };

  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <style>{`
          @keyframes move-twink-back { from { background-position: 0 0; } to { background-position: -10000px 5000px; } }
          @keyframes move-clouds-back { from { background-position: 0 0; } to { background-position: 10000px 0; } }
          .stars-background { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; overflow: hidden; pointer-events: none; }
          .stars { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #000 url('https://i.imgur.com/YKY28eT.png') repeat top center; z-index: 0; }
          .twinkling { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: transparent url('https://i.imgur.com/XYMF4ca.png') repeat top center; animation: move-twink-back 200s linear infinite; z-index: 1; }
          .clouds { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: transparent url('https://i.imgur.com/mHbScrQ.png') repeat top center; animation: move-clouds-back 200s linear infinite; z-index: 2; }
        `}</style>

      <div className="stars-background">
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="clouds"></div>
      </div>

      <div
        style={{
          backgroundColor: "transparent",
          minHeight: "100vh",
          position: "relative",
          zIndex: 10,
        }}
      >
        <Navbar />
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

          <div className="min-h-screen flex flex-col items-center justify-center">
            <p className="font-starjout text-yellow-400 drop-shadow-lg hover:text-yellow-300 transition-colors text-7xl mb-20">Registrations have been <span className="flex justify-center">closed.</span></p>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default RegisterForm;
