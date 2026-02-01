
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, icon, ...props }) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-bold text-stone-600 mb-2 ml-1">{label}</label>
      <div className="relative">
        {icon && <div className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 pointer-events-none">{icon}</div>}
        <input 
          {...props}
          className={`w-full py-5 ${icon ? 'pl-14' : 'pl-6'} pr-6 bg-stone-50 border-2 border-stone-100 rounded-2xl font-bold text-stone-900 outline-none focus:ring-4 focus:ring-emerald-500/20 focus:bg-white focus:border-emerald-500 transition-all placeholder:text-stone-400`}
        />
      </div>
    </div>
  );
};
