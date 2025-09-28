// // src/components/Poster.jsx

// import React from "react";
// import { motion } from "framer-motion";

// const Poster = () => {
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1, transition: { duration: 1 } }}
//       exit={{ opacity: 0, transition: { duration: 1 } }}
//       className="fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center bg-[#131314]"
//     >
//       {/* This path assumes "poster.png" is directly in the "public" folder. */}
//       <img
//         src="/poster.png" 
//         alt="HackNova Event Poster"
//         className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl shadow-yellow-400/10"
//       />
//     </motion.div>
//   );
// };

// export default Poster;
