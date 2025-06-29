
import { motion } from "framer-motion";
import Navigation from "../components/Navigation";
import { Camera, Heart, Star, Award } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Camera, label: "Photos Captured", value: "10,000+" },
    { icon: Heart, label: "Happy Clients", value: "500+" },
    { icon: Star, label: "Years Experience", value: "8" },
    { icon: Award, label: "Awards Won", value: "25" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <Navigation />
      
      <div className="pt-24 px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-serif text-white mb-6">About Luna</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Where dreams meet reality through the magic of photography
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616c9b8c8d6?w=600&h=800&fit=crop"
                  alt="Luna Dreamscape"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent" />
              </div>
              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 bg-pink-500/20 backdrop-blur-sm rounded-full border border-pink-300/30"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white space-y-6"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-3xl font-serif mb-4"
              >
                The Story Behind the Lens
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-white/80 leading-relaxed"
              >
                Luna Dreamscape began as a whisper in the wind, a calling to capture the ethereal 
                moments that dance between reality and dreams. With over 8 years of experience, 
                I've learned that photography isn't just about freezing time—it's about revealing 
                the magic that exists in every moment.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-white/80 leading-relaxed"
              >
                My work specializes in fantasy portraiture, mystical landscapes, and dreamlike 
                compositions that transport viewers to otherworldly realms. Each photograph is 
                carefully crafted to evoke emotion and wonder, blending technical precision with 
                artistic vision.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="text-white/80 leading-relaxed"
              >
                When I'm not behind the camera, you'll find me exploring hidden forests, 
                chasing golden hour light, or dreaming up the next magical scene to bring to life.
              </motion.p>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-xl"
                >
                  <Icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Philosophy Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-serif text-white mb-8">My Philosophy</h2>
            <div className="max-w-4xl mx-auto">
              <motion.blockquote
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6 }}
                className="text-xl text-white/90 italic leading-relaxed bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10"
              >
                "Every photograph is a doorway to another world. My mission is to create images 
                that don't just capture moments, but capture souls—revealing the extraordinary 
                beauty that exists within the ordinary, and the dreams that live just beyond 
                the edge of reality."
              </motion.blockquote>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
