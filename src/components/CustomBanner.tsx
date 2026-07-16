import React from 'react';
import { Lightbulb, Target, Settings, Monitor, Mail, Phone, ChevronsRight } from 'lucide-react';

export const CustomBanner = () => {
  return (
    <div className="relative w-full h-auto sm:h-64 rounded-2xl overflow-hidden bg-[#f3f4f6] text-gray-900 border border-gray-200 shadow-inner flex flex-col sm:flex-row items-center justify-between p-6 sm:p-8">
      {/* Grid Background Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', 
          backgroundSize: '24px 24px' 
        }} 
      />

      {/* Left Section: Info */}
      <div className="relative z-10 flex flex-col space-y-4 w-full sm:w-1/3">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>
            Anshuman Lawankar
          </h1>
          <p className="text-gray-600 text-lg mt-1">Full Stack Developer</p>
        </div>

        {/* Skills Badges */}
        <div className="flex flex-wrap gap-2 pt-2">
          {['React.js', 'Node.js', 'Python & AI'].map((skill) => (
            <span 
              key={skill} 
              className="px-4 py-1.5 rounded-full border border-gray-800 text-sm font-medium text-gray-800 bg-white/50 backdrop-blur-sm"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="pt-4 text-sm text-gray-600 space-y-1">
          <p className="flex items-center gap-2">
            <Mail className="w-4 h-4" /> lawankaranshuman@gmail.com
          </p>
          <p className="flex items-center gap-2">
            <Phone className="w-4 h-4" /> 9156346303
          </p>
        </div>
      </div>

      {/* Center Section: Photo and Decorative elements */}
      <div className="relative z-10 flex-1 flex justify-center items-end h-full mt-8 sm:mt-0">
        {/* Yellow Arch / Circle Background */}
        <div className="absolute bottom-0 w-48 h-56 sm:h-64 bg-amber-400 rounded-t-full -z-10" />
        
        {/* Profile Image (clipped to blend nicely) */}
        <img
          src="/photo/anshuman.jpg"
          alt="Anshuman"
          className="w-44 h-48 sm:h-56 object-cover object-top rounded-t-[100px] rounded-b-2xl shadow-xl border-4 border-white/50"
        />

        {/* Floating Icons */}
        <div className="absolute top-4 -left-8 bg-white p-2 rounded-full shadow-md border border-gray-100 hidden sm:block animate-pulse">
          <Lightbulb className="w-6 h-6 text-gray-800" />
        </div>
        <div className="absolute bottom-12 -left-12 bg-white p-2 rounded-full shadow-md border border-gray-100 hidden sm:block">
          <Settings className="w-6 h-6 text-gray-800" />
        </div>
        <div className="absolute top-12 -right-8 bg-white p-2 rounded-full shadow-md border border-gray-100 hidden sm:block">
          <Target className="w-6 h-6 text-gray-800" />
        </div>
      </div>

      {/* Right Section: Call to action */}
      <div className="relative z-10 flex flex-col items-center sm:items-end justify-center w-full sm:w-1/3 mt-8 sm:mt-0 space-y-4">
        <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 hidden sm:block mb-4">
          <Monitor className="w-8 h-8 text-gray-800" />
        </div>
        
        <div className="flex flex-col items-center sm:items-end gap-2">
          <div className="flex items-center gap-1 border border-gray-800 rounded-full px-4 py-1.5 bg-white/50 backdrop-blur-sm">
            <ChevronsRight className="w-5 h-5 text-gray-800" />
          </div>
          <p className="text-gray-800 font-medium text-center sm:text-right max-w-[150px]">
            Turning Code Into Impact!
          </p>
          <div className="w-32 h-[1px] bg-gray-800 mt-2"></div>
        </div>
      </div>
    </div>
  );
};
