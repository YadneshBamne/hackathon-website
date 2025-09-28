import React from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { Link } from "react-router-dom";

// Animation variants for motion components to reduce repetition
const motionVariants = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

// Data for links and contacts to make the component more data-driven
const quickLinks = [
  { name: "About", href: "#about" },
  { name: "Timeline", href: "#timeline" },
];

const organizerLinks = [
  { name: "Department of Computer Engineering of A.P. Shah Institute of Technology", href: "#" },
];

const socialLinks = [
  { name: "APSIT Crest", imgSrc: "/Apsit_crest.png", href: "https://www.instagram.com/apsit.official/?hl=en", isRounded: false, className: "w-24 h-auto" },
  { name: "CSA", imgSrc: "/csa.png", href: "https://www.instagram.com/comp_engg_apsit?igsh=b2w3aHF3dTFrOTYy" },
  { name: "CodersClub", imgSrc: "/cc_logo.png", href: "https://www.instagram.com/codersclub_apsit?igsh=eGFodGw1NGZhNDh1" },
  { name: "GDG", imgSrc: "/gdg.png", href: "https://www.instagram.com/gdg.apsit?igsh=ZW9kZnluNXlnY2d1" },
];

const contactInfo = [
  { name: "Bhavesh Jain", phone: "" },
  { name: "Sarakshi More", phone: "" },
  { name: "Khushi Jadhav", phone: "" },
];

const legalLinks = [
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Service", href: "#terms" },
    { name: "Cookie Policy", href: "#cookies" },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-yellow-400/20 bg-gradient-to-t from-black via-[#0a0a0a] to-[#131314]">
      {/* Subtle star background */}
      <div className="absolute inset-0 bg-[url('https://i.imgur.com/YKY28eT.png')] bg-repeat opacity-5"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 h-px w-48 -translate-x-1/2 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
      <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-yellow-400/5 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-yellow-400/10 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <motion.div {...motionVariants} transition={{ duration: 0.6 }}>
            <div className="mb-6">
              <h3 className="mb-3 font-starjout text-3xl font-bold text-yellow-400">
                HackNova
              </h3>
              <p className="text-sm leading-relaxed text-gray-300">
                The galactic hackathon where stellar minds unite to build the
                future. Join the alliance and launch your ideas into orbit.
              </p>
              <div className="mt-4 grid grid-cols-4 items-center gap-3">
                {socialLinks.map((social) => (
                  <Link to={social.href} key={social.name}>
                    <img 
                      src={social.imgSrc} 
                      alt={social.name}
                      className={`${social.isRounded !== false ? 'rounded-full' : ''} ${social.className || ''} transition-transform hover:scale-110`}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Link Sections */}
          {[
            { title: "quick Links", links: quickLinks, delay: 0.1 },
            { title: "Powered By", links: organizerLinks, delay: 0.2 },
          ].map((section) => (
            <motion.div
              key={section.title}
              {...motionVariants}
              transition={{ duration: 0.6, delay: section.delay }}
            >
              <h4 className="mb-6 font-starjout text-lg font-semibold text-yellow-400">
                {section.title}
              </h4>
              <nav className="space-y-3">
                {section.links.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block text-sm text-gray-400 transform transition-transform-colors duration-300 hover:translate-x-1 hover:text-yellow-400"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </motion.div>
          ))}

          {/* Contact Info */}
          <motion.div {...motionVariants} transition={{ duration: 0.6, delay: 0.3 }}>
            <h4 className="mb-6 font-starjout text-lg font-semibold text-yellow-400">
              Contact Mission Control
            </h4>
            <div className="space-y-3 text-sm text-gray-400">
              {contactInfo.map((contact) => (
                <p key={contact.name} className="flex items-center gap-2">
                  <Phone size={16} />
                  {contact.name}: {contact.phone}
                </p>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          {...motionVariants}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t border-yellow-400/20 pt-8"
        >
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-center md:text-left">
              <p className="mb-2 text-sm text-gray-400">
                &copy; {new Date().getFullYear()} HackNova. All rights reserved
                across the galaxy.
              </p>
              <p className="text-xs text-gray-500">
                May the code be with you. Always.
              </p>
            </div>

            <nav className="flex items-center gap-6 text-xs text-gray-500">
              {legalLinks.map(link => (
                 <a key={link.name} href={link.href} className="transition-colors hover:text-yellow-400">
                    {link.name}
                 </a>
              ))}
            </nav>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
