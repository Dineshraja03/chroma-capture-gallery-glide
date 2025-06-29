
import { motion } from "framer-motion";
import { useState } from "react";
import Navigation from "../components/Navigation";
import { Mail, Phone, MapPin, Send, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 relative overflow-hidden">
      {/* Animated stars */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          >
            <Star className="w-4 h-4 text-white/30" />
          </motion.div>
        ))}
      </div>

      <Navigation />
      
      <div className="pt-24 px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-serif text-white mb-6">Get in Touch</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Ready to create something magical together? Let's bring your vision to life.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl"
          >
            <h2 className="text-2xl font-serif text-white mb-6">Send a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Label htmlFor="name" className="text-white/80 mb-2 block">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Your full name"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Label htmlFor="email" className="text-white/80 mb-2 block">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="your.email@example.com"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Label htmlFor="subject" className="text-white/80 mb-2 block">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="What's this about?"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Label htmlFor="message" className="text-white/80 mb-2 block">Message</Label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white placeholder:text-white/50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                  placeholder="Tell me about your dream project..."
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </motion.div>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl">
              <h2 className="text-2xl font-serif text-white mb-6">Let's Connect</h2>
              
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center space-x-4"
                >
                  <div className="bg-purple-500/20 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Email</h3>
                    <p className="text-white/70">luna@dreamscape.photo</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center space-x-4"
                >
                  <div className="bg-pink-500/20 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Phone</h3>
                    <p className="text-white/70">+1 (555) 123-4567</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center space-x-4"
                >
                  <div className="bg-indigo-500/20 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Studio</h3>
                    <p className="text-white/70">Los Angeles, CA</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Interactive Map Area */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl"
            >
              <h3 className="text-xl font-serif text-white mb-4">Studio Location</h3>
              <div className="relative h-48 bg-gradient-to-br from-purple-800/30 to-indigo-800/30 rounded-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-4 h-4 bg-purple-400 rounded-full shadow-lg"
                  />
                  <motion.div
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0.7, 0.3]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute w-8 h-8 border-2 border-purple-400 rounded-full"
                  />
                </div>
              </div>
              <p className="text-white/70 text-sm mt-4">
                Located in the heart of Los Angeles, our studio is where dreams come to life.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
