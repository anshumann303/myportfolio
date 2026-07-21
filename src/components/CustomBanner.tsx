import React from 'react';
import { Lightbulb, Target, Settings, Monitor, Mail, Phone, ChevronsRight } from 'lucide-react';

export const CustomBanner = () => {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-inner border border-zinc-800">
      <img
        src="/my-new-bg.jpg"
        alt="Anshuman Lawankar - Full Stack Developer"
        className="w-full h-auto object-cover"
      />
    </div>
  );
};
