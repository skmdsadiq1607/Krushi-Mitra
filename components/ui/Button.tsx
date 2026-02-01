import React from 'react';
// FIX: Import HTMLMotionProps to resolve type conflicts with standard React HTML attributes.
import { motion, HTMLMotionProps } from 'framer-motion';

// FIX: Extend HTMLMotionProps<'button'> instead of React.ButtonHTMLAttributes<HTMLButtonElement>.
// This ensures that the props passed to motion.button have the correct types for gesture handlers
// like onDrag, avoiding conflicts.
interface ButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = "w-full py-5 px-8 rounded-2xl font-black text-lg shadow-xl transition-all flex items-center justify-center disabled:opacity-50 focus-visible:ring-4 focus-visible:ring-emerald-500/50 outline-none";
  
  const variantClasses = {
    primary: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-500/20',
    secondary: 'bg-stone-100 text-stone-700 hover:bg-stone-200 shadow-stone-500/10',
  };

  return (
    <motion.button 
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`} 
      {...props}
    >
      {children}
    </motion.button>
  );
};
