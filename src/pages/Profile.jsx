import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { User, Mail, Save, LogOut, Camera, Shield } from 'lucide-react';
import Button from '../components/Button';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user, logout } = useAuth();
  const { addToast } = useToast();
  const [name, setName] = useState(user?.name || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    // For mock, just show toast and toggle
    addToast({ message: 'Profile updated successfully!', type: 'success' });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:px-8">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-800">
        {/* Profile Header */}
        <div className="premium-gradient h-32 md:h-48 relative">
          <div className="absolute -bottom-12 left-8 p-1 bg-white dark:bg-slate-900 rounded-3xl shadow-xl">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 dark:text-slate-600 relative overflow-hidden group">
               <User size={60} />
               <button className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <Camera size={24} />
               </button>
            </div>
          </div>
        </div>

        <div className="pt-20 px-8 pb-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
            <div>
              <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-1">{user?.name}</h1>
              <p className="text-slate-500 font-medium flex items-center gap-2">
                <Mail size={16} /> {user?.email}
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant={isEditing ? 'outline' : 'primary'} 
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
              <Button variant="danger" onClick={logout}>
                <LogOut size={18} className="mr-2" />
                Logout
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <User size={20} className="text-primary" />
                Personal Information
              </h3>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-wider">Full Name</label>
                  <input 
                    type="text" 
                    value={name}
                    disabled={!isEditing}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-3 px-4 outline-none disabled:opacity-50 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-wider">Email (Read Only)</label>
                  <input 
                    type="email" 
                    value={user?.email}
                    disabled
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-3 px-4 opacity-50 text-slate-400 font-medium"
                  />
                </div>
                {isEditing && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <Button type="submit" variant="primary" className="w-full">
                      <Save size={18} className="mr-2" />
                      Save Changes
                    </Button>
                  </motion.div>
                )}
              </form>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <Shield size={20} className="text-primary" />
                Account Security
              </h3>
              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                  Manage your account security and preferences.
                </p>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">Change Password</Button>
                  <Button variant="outline" className="w-full justify-start">Manage Sessions</Button>
                  <Button variant="ghost" className="w-full justify-start text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20">Delete Account</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
