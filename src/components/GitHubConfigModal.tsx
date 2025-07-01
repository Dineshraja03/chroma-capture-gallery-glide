
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setGitHubConfig, getGitHubConfig, type GitHubConfig } from "../services/githubApi";
import { useToast } from "@/hooks/use-toast";

interface GitHubConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

const GitHubConfigModal = ({ isOpen, onClose, isDarkMode }: GitHubConfigModalProps) => {
  const [config, setConfig] = useState<GitHubConfig>(() => {
    const existing = getGitHubConfig();
    return existing || { token: '', owner: '', repo: '' };
  });
  const { toast } = useToast();

  const handleSave = () => {
    if (!config.token || !config.owner || !config.repo) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setGitHubConfig(config);
    toast({
      title: "Configuration Saved",
      description: "GitHub settings have been saved successfully",
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`max-w-md w-full mx-4 ${
              isDarkMode ? 'bg-gray-900' : 'bg-white'
            } rounded-2xl shadow-2xl border ${
              isDarkMode ? 'border-white/10' : 'border-gray-200'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                  <Github className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`} />
                  <h2 className={`text-2xl font-serif ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    GitHub Configuration
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className={`p-2 rounded-full ${
                    isDarkMode ? 'hover:bg-white/10 text-white' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label className={isDarkMode ? 'text-white' : 'text-gray-700'}>
                    GitHub Personal Access Token
                  </Label>
                  <Input
                    type="password"
                    value={config.token}
                    onChange={(e) => setConfig({...config, token: e.target.value})}
                    placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                    className={`${
                      isDarkMode ? 'bg-white/10 border-white/20 text-white' : 'bg-gray-50 border-gray-300'
                    }`}
                  />
                  <p className={`text-xs mt-1 ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`}>
                    Create a token at github.com/settings/tokens with repo permissions
                  </p>
                </div>
                
                <div>
                  <Label className={isDarkMode ? 'text-white' : 'text-gray-700'}>
                    GitHub Username/Organization
                  </Label>
                  <Input
                    value={config.owner}
                    onChange={(e) => setConfig({...config, owner: e.target.value})}
                    placeholder="your-username"
                    className={`${
                      isDarkMode ? 'bg-white/10 border-white/20 text-white' : 'bg-gray-50 border-gray-300'
                    }`}
                  />
                </div>
                
                <div>
                  <Label className={isDarkMode ? 'text-white' : 'text-gray-700'}>
                    Repository Name
                  </Label>
                  <Input
                    value={config.repo}
                    onChange={(e) => setConfig({...config, repo: e.target.value})}
                    placeholder="my-gallery-repo"
                    className={`${
                      isDarkMode ? 'bg-white/10 border-white/20 text-white' : 'bg-gray-50 border-gray-300'
                    }`}
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 pt-6">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Configuration
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GitHubConfigModal;
