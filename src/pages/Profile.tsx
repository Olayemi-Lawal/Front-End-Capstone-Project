import React, { useState } from 'react';
import { User, Mail, Calendar, Edit2, Save, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import StarRating from '../components/StarRating';

const Profile: React.FC = () => {
  const { user, updateUser, isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || '',
  });

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <User className="h-16 w-16 text-dark-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Sign in to view your profile</h2>
          <p className="text-dark-400">Access your account information and preferences</p>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    updateUser(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: user.name,
      email: user.email,
      avatar: user.avatar || '',
    });
    setIsEditing(false);
  };

  const ratedMovies = Object.entries(user.ratings);
  const averageRating = ratedMovies.length > 0 
    ? ratedMovies.reduce((acc, [, rating]) => acc + rating, 0) / ratedMovies.length 
    : 0;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-white mb-8">Profile</h1>

          {/* Profile Card */}
          <div className="glass rounded-xl p-8 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-24 h-24 rounded-full border-4 border-primary-500"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gradient-to-br from-primary-600 to-primary-800 rounded-full flex items-center justify-center border-4 border-primary-500">
                    <User className="h-12 w-12 text-white" />
                  </div>
                )}
                
                {isEditing && (
                  <button className="absolute -bottom-2 -right-2 p-2 bg-primary-600 hover:bg-primary-700 rounded-full text-white transition-colors">
                    <Edit2 className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                        className="input-field"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                        className="input-field"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">
                        Avatar URL
                      </label>
                      <input
                        type="url"
                        value={editForm.avatar}
                        onChange={(e) => setEditForm(prev => ({ ...prev, avatar: e.target.value }))}
                        className="input-field"
                        placeholder="https://example.com/avatar.jpg"
                      />
                    </div>
                    
                    <div className="flex gap-3">
                      <button onClick={handleSave} className="btn-primary flex items-center space-x-2">
                        <Save className="h-4 w-4" />
                        <span>Save</span>
                      </button>
                      <button onClick={handleCancel} className="btn-secondary flex items-center space-x-2">
                        <X className="h-4 w-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="p-2 text-dark-400 hover:text-white transition-colors"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="space-y-2 text-dark-300">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slide-up">
            <div className="glass rounded-lg p-6 text-center">
              <h3 className="text-2xl font-bold text-primary-400 mb-2">
                {user.watchlist.length}
              </h3>
              <p className="text-dark-300">Movies in Watchlist</p>
            </div>
            
            <div className="glass rounded-lg p-6 text-center">
              <h3 className="text-2xl font-bold text-accent-400 mb-2">
                {ratedMovies.length}
              </h3>
              <p className="text-dark-300">Movies Rated</p>
            </div>
            
            <div className="glass rounded-lg p-6 text-center">
              <h3 className="text-2xl font-bold text-yellow-400 mb-2">
                {averageRating.toFixed(1)}
              </h3>
              <p className="text-dark-300">Average Rating</p>
            </div>
          </div>

          {/* Recent Ratings */}
          {ratedMovies.length > 0 && (
            <div className="glass rounded-lg p-6 animate-slide-up">
              <h3 className="text-xl font-bold text-white mb-6">Recent Ratings</h3>
              <div className="space-y-4">
                {ratedMovies.slice(-5).reverse().map(([movieId, rating]) => (
                  <div key={movieId} className="flex items-center justify-between py-3 border-b border-dark-700 last:border-b-0">
                    <div>
                      <p className="text-white font-medium">Movie #{movieId}</p>
                      <p className="text-dark-400 text-sm">Your rating</p>
                    </div>
                    <StarRating rating={rating} readOnly size="small" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;