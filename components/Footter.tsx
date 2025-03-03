"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { motion, useMotionTemplate, useMotionValue, useMotionValueEvent, animate } from "framer-motion";
import { useEffect, useState } from "react";


const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

// Home Page Component
export const Footter = () => {
const color = useMotionValue(COLORS_TOP[0]);
    const borderColor = useMotionValue(COLORS_TOP[0]); // Border color animation
    const [currentColor, setCurrentColor] = useState(COLORS_TOP[0]); 
  
    useEffect(() => {
      const controls = animate(color, COLORS_TOP, {
        ease: "easeInOut",
        duration: 10,
        repeat: Infinity,
        repeatType: "mirror",
      });
  
      const borderControls = animate(borderColor, COLORS_TOP, {
        ease: "easeInOut",
        duration: 10,
        repeat: Infinity,
        repeatType: "mirror",
      });
  
      return () => {
        controls.stop();
        borderControls.stop();
      };
    }, []);
  
    // Update state whenever `color` changes
    useMotionValueEvent(color, "change", (latest) => {
      setCurrentColor(latest);
    });
  
    const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #000 50%, ${currentColor})`;
    const borderColorStyle = useMotionTemplate`${borderColor}`;
  


  return (
    <main className=" flex flex-col items-center w-full text-white  mt-10">
      {/* Contact Section */}
      <motion.section style={{ backgroundImage, radius: 10 }} id="contact" className="w-full max-w-4xl py-4 px-6 text-center mt-10 rounded-sm md:rounded-md">
        <h2 className="text-3xl font-bold">Get in Touch</h2>
        <p className="mt-4 text-gray-400">Feel free to reach out to me for collaborations or job opportunities.</p>
        <div className="flex justify-center mt-6 space-x-6">
          <a href="mailto:ve48381@gmail.com" className="text-2xl text-gray-400 hover:text-white transition">
            <FaEnvelope />
          </a>
          <a href="https://github.com/gem870" target="_blank" className="text-2xl text-gray-400 hover:text-white transition">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/chibuike-emmanuel-b8b29b269/" target="_blank" className="text-2xl text-gray-400 hover:text-white transition">
            <FaLinkedin />
          </a>
          <a href="https://x.com/gem_vic" target="_blank" className="text-2xl text-gray-400 hover:text-white transition">
            <FaTwitter />
          </a>
        </div>
      </motion.section>
    </main>
  );
};
