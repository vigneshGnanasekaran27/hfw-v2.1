import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * FitnessCTAButton - A dynamic, motivational CTA button with twinkling star effects
 * Incorporates light, clean color palette for fitness-related sections
 */
const FitnessCTAButton = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary',
  size = 'md'
}) => {
  // Variant styles with clean, light fitness-inspired color palette
  const variantStyles = {
    primary: `
      bg-sky-100 text-sky-700 
      hover:bg-sky-200 
      focus:ring-sky-300/50
      dark:bg-sky-200 dark:text-sky-800 
      dark:hover:bg-sky-300
    `,
    nutrition: `
      bg-emerald-50 text-emerald-700 
      hover:bg-emerald-100 
      focus:ring-emerald-300/50
      dark:bg-emerald-100 dark:text-emerald-800 
      dark:hover:bg-emerald-200
    `,
    training: `
      bg-teal-50 text-teal-700 
      hover:bg-teal-100 
      focus:ring-teal-300/50
      dark:bg-teal-100 dark:text-teal-800 
      dark:hover:bg-teal-200
    `,
    events: `
      bg-indigo-50 text-indigo-700 
      hover:bg-indigo-100 
      focus:ring-indigo-300/50
      dark:bg-indigo-100 dark:text-indigo-800 
      dark:hover:bg-indigo-200
    `,
    workshop: `
      bg-violet-50 text-violet-700 
      hover:bg-violet-100 
      focus:ring-violet-300/50
      dark:bg-violet-100 dark:text-violet-800 
      dark:hover:bg-violet-200
    `
  };

  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  // Continuous pulse and float animations
  const animationVariants = {
    initial: { 
      scale: 1,
      y: 0,
      rotate: 0
    },
    animate: { 
      scale: [1, 1.03, 1],
      y: [0, -5, 0],
      rotate: [0, 1, -1, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.5, 1],
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  // Background gradient animation
  const backgroundVariants = {
    initial: { 
      backgroundPosition: '0% 50%',
      backgroundSize: '200% 200%'
    },
    animate: { 
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      backgroundSize: '200% 200%',
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  // Generate random stars with memoization
  const stars = useMemo(() => {
    return Array.from({ length: 12 }, (_, index) => ({
      key: index,
      x: Math.random() * 100 - 50, // Random x position
      y: Math.random() * 100 - 50, // Random y position
      scale: Math.random() * 0.5 + 0.5, // Random scale between 0.5 and 1
      delay: Math.random() * 2 // Random delay for staggered animation
    }));
  }, []);

  // Star twinkling animation
  const starVariants = {
    initial: { 
      opacity: 0,
      scale: 0.5,
      rotate: 0
    },
    animate: (custom) => ({ 
      opacity: [0, 1, 0],
      scale: [0.5, 1, 0.5],
      rotate: [0, 360, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        delay: custom.delay,
        ease: "easeInOut"
      }
    })
  };

  return (
    <div className="relative inline-block">
      {/* Twinkling Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.key}
          custom={star}
          variants={starVariants}
          initial="initial"
          animate="animate"
          className="absolute z-0 pointer-events-none"
          style={{
            left: `calc(50% + ${star.x}%)`,
            top: `calc(50% + ${star.y}%)`,
            transform: `translate(-50%, -50%) scale(${star.scale})`,
            zIndex: 500,
          }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="8" 
            height="8" 
            viewBox="0 0 8 8" 
            fill="currentColor" 
            className="text-yellow-300"
          >
            {/* Small point-like star spark */}
            <path 
              d="M4 0 L5 3 L8 3.5 L5.5 6 L6 8 L4 6.5 L2 8 L2.5 6 L0 3.5 L3 3 Z" 
              scale="0.5"
              fillRule="evenodd"
            />
          </svg>
        </motion.div>
      ))}

      {/* Main Button */}
      <motion.button
        variants={animationVariants}
        initial="initial"
        animate="animate"
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`
          relative 
          inline-flex 
          items-center 
          justify-center 
          font-bold 
          rounded-full 
          shadow-lg 
          focus:outline-none 
          focus:ring-4 
          transition-all 
          duration-300 
          ease-in-out
          overflow-hidden
          group
          z-10
          border border-transparent
          ${variantStyles[variant] || variantStyles.primary}
          ${sizeStyles[size] || sizeStyles.md}
          ${className}
        `}
      >
        {/* Continuous Gradient Background Effect */}
        <motion.span
          variants={backgroundVariants}
          initial="initial"
          animate="animate"
          className="
            absolute 
            inset-0 
            bg-gradient-to-r 
            from-sky-100/20 
            via-emerald-100/20 
            to-indigo-100/20 
            opacity-20 
            group-hover:opacity-40 
            transition-opacity 
            duration-500
          "
        />
        
        {/* Button Content with Continuous Animation */}
        <motion.span 
          className="relative z-10 flex items-center justify-center space-x-2"
          variants={{
            initial: { x: 0 },
            animate: { 
              x: [0, 5, 0],
              transition: { 
                repeat: Infinity, 
                duration: 1.5,
                ease: "easeInOut"
              } 
            }
          }}
        >
          {children}
          <motion.span
            variants={{
              initial: { x: 0 },
              animate: { 
                x: [0, 5, 0],
                transition: { 
                  repeat: Infinity, 
                  duration: 1.5,
                  ease: "easeInOut"
                } 
              }
            }}
          >
            →
          </motion.span>
        </motion.span>
      </motion.button>
    </div>
  );
};

export default FitnessCTAButton;

// Example usage for different sections:
// Nutrition Section: 
// <FitnessCTAButton 
//   onClick={() => handleNutritionPlan()} 
//   variant="nutrition" 
//   size="md"
// >
//   Explore Nutrition Plan
// </FitnessCTAButton>

// Training Section:
// <FitnessCTAButton 
//   onClick={() => handleTrainingProgram()} 
//   variant="training" 
//   size="md"
// >
//   Start Training
// </FitnessCTAButton>

// Events Section:
// <FitnessCTAButton 
//   onClick={() => handleFitnessEvents()} 
//   variant="events" 
//   size="md"
// >
//   View Fitness Events
// </FitnessCTAButton>

// Workshop Section:
// <FitnessCTAButton 
//   onClick={() => handleWorkshop()} 
//   variant="workshop" 
//   size="md"
// >
//   Join Workshop
// </FitnessCTAButton>