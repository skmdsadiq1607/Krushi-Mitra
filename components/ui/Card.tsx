
import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, title, icon, className = '' }) => {
  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.07)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`bg-white p-8 rounded-3xl border border-stone-200 shadow-sm ${className}`}
    >
      {title && (
        <div className="flex items-center mb-6">
          {icon && <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg mr-3">{icon}</div>}
          <h2 className="text-xl font-bold text-stone-800">{title}</h2>
        </div>
      )}
      {children}
    </motion.div>
  );
};
