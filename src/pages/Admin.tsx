
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "../components/Navigation";
import { Upload, Trash2, Edit, Eye, Plus, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for demonstration
const mockImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    title: "Mystical Forest",
    description: "A dreamy forest scene with ethereal lighting",
    tags: ["nature", "forest", "mystical"],
    uploadDate: "2024-01-15"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=300&fit=crop",
    title: "Cosmic Dreams",
    description: "Stars and galaxies in perfect harmony",
    tags: ["space", "cosmic", "dreams"],
    uploadDate: "2024-01-10"
  }
];

interface ImageData {
  id: number;
  src: string;
  title: string;
  description: string;
  tags: string[];
  uploadDate: string;
}

const Admin = () => {
  const [images, setImages] = useState<ImageData[]>(mockImages);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [editingImage, setEditingImage] = useState<ImageData | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const [newImage, setNewImage] = useState({
    title: '',
    description: '',
    tags: '',
    file: null as File | null
  });

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (newImage.file) {
      const newId = Math.max(...images.map(img => img.id)) + 1;
      const imageData: ImageData = {
        id: newId,
        src: URL.createObjectURL(newImage.file),
        title: newImage.title,
        description: newImage.description,
        tags: newImage.tags.split(',').map(tag => tag.trim()),
        uploadDate: new Date().toISOString().split('T')[0]
      };
      setImages([...images, imageData]);
      setNewImage({ title: '', description: '', tags: '', file: null });
      setShowUploadModal(false);
    }
  };

  const handleDelete = (id: number) => {
    setImages(images.filter(img => img.id !== id));
    setDeleteConfirm(null);
  };

  const handleEdit = (image: ImageData) => {
    setEditingImage(image);
  };

  const saveEdit = () => {
    if (editingImage) {
      setImages(images.map(img => 
        img.id === editingImage.id ? editingImage : img
      ));
      setEditingImage(null);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900' 
        : 'bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100'
    }`}>
      <Navigation />
      
      <div className="pt-24 px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className={`text-4xl font-serif mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Admin Panel
            </h1>
            <p className={`text-lg ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>
              Manage your gallery collection
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Dark/Light Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`px-4 py-2 rounded-full transition-all ${
                isDarkMode 
                  ? 'bg-white/10 text-white border border-white/20' 
                  : 'bg-gray-800/10 text-gray-800 border border-gray-300'
              }`}
            >
              {isDarkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
            
            {/* Upload Button */}
            <Button
              onClick={() => setShowUploadModal(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Upload Photo
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Card className={`${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/80 border-gray-200'} backdrop-blur-md`}>
            <CardHeader className="pb-3">
              <CardTitle className={isDarkMode ? 'text-white' : 'text-gray-800'}>Total Photos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                {images.length}
              </div>
            </CardContent>
          </Card>
          
          <Card className={`${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/80 border-gray-200'} backdrop-blur-md`}>
            <CardHeader className="pb-3">
              <CardTitle className={isDarkMode ? 'text-white' : 'text-gray-800'}>Recent Uploads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`}>
                {images.filter(img => {
                  const uploadDate = new Date(img.uploadDate);
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return uploadDate >= weekAgo;
                }).length}
              </div>
            </CardContent>
          </Card>
          
          <Card className={`${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/80 border-gray-200'} backdrop-blur-md`}>
            <CardHeader className="pb-3">
              <CardTitle className={isDarkMode ? 'text-white' : 'text-gray-800'}>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                {new Set(images.flatMap(img => img.tags)).size}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Image Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`${
                isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/80 border-gray-200'
              } backdrop-blur-md rounded-xl border shadow-xl overflow-hidden`}
            >
              <div className="relative group">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
                  <button
                    onClick={() => handleEdit(image)}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(image.id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {image.title}
                </h3>
                <p className={`text-sm mb-3 ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  {image.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {image.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-1 text-xs rounded-full ${
                        isDarkMode 
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                          : 'bg-purple-100 text-purple-800 border border-purple-200'
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <p className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                  Uploaded: {image.uploadDate}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setShowUploadModal(false)}
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
                  <h2 className={`text-2xl font-serif ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    Upload New Photo
                  </h2>
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className={`p-2 rounded-full ${
                      isDarkMode ? 'hover:bg-white/10 text-white' : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <form onSubmit={handleUpload} className="space-y-4">
                  <div>
                    <Label className={isDarkMode ? 'text-white' : 'text-gray-700'}>Photo File</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNewImage({...newImage, file: e.target.files?.[0] || null})}
                      className={`${
                        isDarkMode ? 'bg-white/10 border-white/20 text-white' : 'bg-gray-50 border-gray-300'
                      }`}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label className={isDarkMode ? 'text-white' : 'text-gray-700'}>Title</Label>
                    <Input
                      value={newImage.title}
                      onChange={(e) => setNewImage({...newImage, title: e.target.value})}
                      className={`${
                        isDarkMode ? 'bg-white/10 border-white/20 text-white' : 'bg-gray-50 border-gray-300'
                      }`}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label className={isDarkMode ? 'text-white' : 'text-gray-700'}>Description</Label>
                    <textarea
                      value={newImage.description}
                      onChange={(e) => setNewImage({...newImage, description: e.target.value})}
                      className={`w-full px-3 py-2 rounded-md border ${
                        isDarkMode 
                          ? 'bg-white/10 border-white/20 text-white placeholder:text-white/50' 
                          : 'bg-gray-50 border-gray-300 text-gray-900'
                      }`}
                      rows={3}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label className={isDarkMode ? 'text-white' : 'text-gray-700'}>Tags (comma separated)</Label>
                    <Input
                      value={newImage.tags}
                      onChange={(e) => setNewImage({...newImage, tags: e.target.value})}
                      placeholder="nature, landscape, mystical"
                      className={`${
                        isDarkMode ? 'bg-white/10 border-white/20 text-white' : 'bg-gray-50 border-gray-300'
                      }`}
                    />
                  </div>
                  
                  <div className="flex space-x-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowUploadModal(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`max-w-sm w-full mx-4 ${
                isDarkMode ? 'bg-gray-900' : 'bg-white'
              } rounded-2xl shadow-2xl border ${
                isDarkMode ? 'border-white/10' : 'border-gray-200'
              } p-6`}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Delete Photo?
              </h3>
              <p className={`mb-6 ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>
                This action cannot be undone. Are you sure you want to delete this photo?
              </p>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  Delete
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setEditingImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`max-w-md w-full mx-4 ${
                isDarkMode ? 'bg-gray-900' : 'bg-white'
              } rounded-2xl shadow-2xl border ${
                isDarkMode ? 'border-white/10' : 'border-gray-200'
              } p-6`}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Edit Photo
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Label className={isDarkMode ? 'text-white' : 'text-gray-700'}>Title</Label>
                  <Input
                    value={editingImage.title}
                    onChange={(e) => setEditingImage({...editingImage, title: e.target.value})}
                    className={`${
                      isDarkMode ? 'bg-white/10 border-white/20 text-white' : 'bg-gray-50 border-gray-300'
                    }`}
                  />
                </div>
                
                <div>
                  <Label className={isDarkMode ? 'text-white' : 'text-gray-700'}>Description</Label>
                  <textarea
                    value={editingImage.description}
                    onChange={(e) => setEditingImage({...editingImage, description: e.target.value})}
                    className={`w-full px-3 py-2 rounded-md border ${
                      isDarkMode 
                        ? 'bg-white/10 border-white/20 text-white placeholder:text-white/50' 
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label className={isDarkMode ? 'text-white' : 'text-gray-700'}>Tags</Label>
                  <Input
                    value={editingImage.tags.join(', ')}
                    onChange={(e) => setEditingImage({
                      ...editingImage, 
                      tags: e.target.value.split(',').map(tag => tag.trim())
                    })}
                    className={`${
                      isDarkMode ? 'bg-white/10 border-white/20 text-white' : 'bg-gray-50 border-gray-300'
                    }`}
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setEditingImage(null)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={saveEdit}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Admin;
