
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ButterflyLoaderProps {
  onComplete: () => void;
}

const ButterflyLoader = ({ onComplete }: ButterflyLoaderProps) => {
  const [stage, setStage] = useState<'flying' | 'landing' | 'transforming'>('flying');

  useEffect(() => {
    const timer1 = setTimeout(() => setStage('landing'), 2000);
    const timer2 = setTimeout(() => setStage('transforming'), 3000);
    const timer3 = setTimeout(onComplete, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Butterfly */}
        <motion.div
          className="absolute"
          initial={{ x: "10vw", y: "90vh" }}
          animate={
            stage === 'flying'
              ? { x: "85vw", y: "15vh" }
              : stage === 'landing'
              ? { x: "50vw", y: "50vh", scale: 1.5 }
              : { scale: 3, opacity: 0 }
          }
          transition={{ 
            duration: stage === 'flying' ? 2 : stage === 'landing' ? 1 : 1,
            ease: "easeInOut"
          }}
        >
          <div className="relative">
            {/* Butterfly body */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-purple-300 to-purple-600 rounded-full z-10" />
            
            {/* Left wing */}
            <motion.div
              className="absolute left-0 top-0 w-6 h-8 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-full opacity-80 backdrop-blur-sm"
              animate={{ rotateY: [0, 15, 0] }}
              transition={{ duration: 0.3, repeat: Infinity }}
              style={{
                transformOrigin: "right center",
                filter: "drop-shadow(0 0 10px rgba(168, 85, 247, 0.5))",
              }}
            />
            
            {/* Right wing */}
            <motion.div
              className="absolute right-0 top-0 w-6 h-8 bg-gradient-to-bl from-cyan-400 via-purple-500 to-pink-500 rounded-full opacity-80 backdrop-blur-sm"
              animate={{ rotateY: [0, -15, 0] }}
              transition={{ duration: 0.3, repeat: Infinity }}
              style={{
                transformOrigin: "left center",
                filter: "drop-shadow(0 0 10px rgba(168, 85, 247, 0.5))",
              }}
            />
          </div>
        </motion.div>

        {/* Ripple effect during transformation */}
        {stage === 'transforming' && (
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{ width: "200vw", height: "200vh", opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="w-full h-full rounded-full border-4 border-purple-400 opacity-50" />
          </motion.div>
        )}

        {/* Loading text */}
        <motion.div
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white text-xl font-light tracking-wider"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Entering the Dream...
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ButterflyLoader;
