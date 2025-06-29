
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Camera, User, Mail, Settings } from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/gallery", label: "Gallery", icon: Camera },
    { path: "/about", label: "About", icon: User },
    { path: "/contact", label: "Contact", icon: Mail },
    { path: "/admin", label: "Admin", icon: Settings },
  ];

  if (isMobile) {
    // Mobile navigation - bottom navbar
    return (
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/10 backdrop-blur-md border-t border-white/20 shadow-xl"
      >
        <div className="flex items-center justify-around px-4 py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative group flex flex-col items-center"
              >
                <motion.div
                  className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-full transition-all duration-300 ${
                    isActive 
                      ? "bg-white/20 text-white" 
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={20} />
                  <span className="text-xs font-medium">{item.label}</span>
                </motion.div>
                
                {isActive && (
                  <motion.div
                    layoutId="activeTabMobile"
                    className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </motion.nav>
    );
  }

  // Desktop navigation - centered at top
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-40"
    >
      <div className="bg-white/10 backdrop-blur-md rounded-full px-8 py-4 border border-white/20 shadow-xl">
        <div className="flex items-center justify-center space-x-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative group"
              >
                <motion.div
                  className={`flex items-center space-x-3 px-4 py-2 rounded-full transition-all duration-300 ${
                    isActive 
                      ? "bg-white/20 text-white" 
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.div>
                
                {isActive && (
                  <motion.div
                    layoutId="activeTabDesktop"
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full border border-white/30"
                    style={{ filter: "blur(8px)" }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
