import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const socialLinks = [
    { name: 'Twitter', href: '#', icon: '🐦' },
    { name: 'Instagram', href: '#', icon: '📸' },
    { name: 'LinkedIn', href: '#', icon: '💼' },
    { name: 'Discord', href: '#', icon: '💬' }
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' }
  ];

  const organizerLinks = [
    { name: 'CSA', href: '#' },
    { name: 'CC', href: '#' },
    { name: 'GDG', href: '#' },
    { name: 'APSIT', href: '#' }
  ];

  return (
    <footer className="relative bg-gradient-to-t from-[#000000] via-[#0a0a0a] to-[#131314] border-t border-yellow-400/20 overflow-hidden">
      {/* Subtle star background for footer */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('https://i.imgur.com/YKY28eT.png')] bg-repeat opacity-30"></div>
      </div>

      {/* Decorative glow line at top */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-yellow-400 font-starjout mb-3">
                HackNova
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                The galactic hackathon where stellar minds unite to build the future. 
                Join the alliance and launch your ideas into orbit.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-yellow-400/10 border border-yellow-400/30 rounded-full flex items-center justify-center text-yellow-400 hover:bg-yellow-400/20 hover:border-yellow-400/50 transition-all duration-300 hover:scale-110"
                  aria-label={social.name}
                >
                  <span className="text-sm">{social.icon}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold text-yellow-400 font-starjout mb-6">
              Quick Links
            </h4>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-sm hover:translate-x-1 transform transition-transform"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Organizers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-yellow-400 font-starjout mb-6">
              Powered By
            </h4>
            <nav className="space-y-3">
              {organizerLinks.map((org) => (
                <a
                  key={org.name}
                  href={org.href}
                  className="block text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-sm hover:translate-x-1 transform transition-transform"
                >
                  {org.name}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold text-yellow-400 font-starjout mb-6">
              Contact Mission Control
            </h4>
            <div className="space-y-3 text-sm text-gray-400">
              <p>📧 contact@hacknova.in</p>
              <p>📞 +91 98765 43210</p>
              <p>📍 APSIT, Thane, Mumbai</p>
              <p>🗓️ December 14-15, 2025</p>
            </div>
          </motion.div>
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-yellow-400/5 to-transparent border border-yellow-400/20 rounded-2xl p-8 mb-12"
        >
          <div className="text-center md:text-left md:flex md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <h4 className="text-xl font-semibold text-yellow-400 font-starjout mb-2">
                Stay in the Loop
              </h4>
              <p className="text-gray-300 text-sm">
                Get updates about HackNova and future galactic missions
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="your.email@galaxy.com"
                className="px-4 py-3 bg-black/50 border border-yellow-400/30 rounded-lg text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none transition-colors"
              />
              <button className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition-colors duration-300 transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t border-yellow-400/20 pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm mb-2">
                © {new Date().getFullYear()} HackNova. All rights reserved across the galaxy.
              </p>
              <p className="text-gray-500 text-xs">
                May the code be with you. Always.
              </p>
            </div>
            
            {/* Legal Links */}
            <nav className="flex items-center gap-6 text-xs text-gray-500">
              <a href="#privacy" className="hover:text-yellow-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="hover:text-yellow-400 transition-colors">
                Terms of Service
              </a>
              <a href="#cookies" className="hover:text-yellow-400 transition-colors">
                Cookie Policy
              </a>
            </nav>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-400/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-yellow-400/3 rounded-full blur-3xl"></div>
    </footer>
  );
};

export default Footer;
