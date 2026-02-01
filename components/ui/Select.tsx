
import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
}

export const Select: React.FC<SelectProps> = ({ label, options, ...props }) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-bold text-stone-600 mb-2 ml-1">{label}</label>
      <select 
        {...props}
        className="w-full p-5 bg-stone-50 border-2 border-stone-100 rounded-2xl font-bold text-stone-900 outline-none focus:ring-4 focus:ring-emerald-500/20 focus:bg-white focus:border-emerald-500 transition-all appearance-none"
      >
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};
