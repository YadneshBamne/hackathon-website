import React from "react";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <header className="w-full bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <span className="text-2xl font-bold text-indigo-600 tracking-wide">
          HackNova
        </span>

        <Button className="px-6 py-2 rounded-full font-medium hover:scale-105 transition-transform">
          Register
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
