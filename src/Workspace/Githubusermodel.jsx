import React, { useState, useEffect } from "react";
import axios from "axios";
import { Crown, Github, Loader2 } from "lucide-react";

export default function GitHubUserModal({ isOpen, onClose, user, isDarkMode }) {
  const [userRepos, setUserRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (isOpen && user) {
      fetchUserRepos();
    }
  }, [isOpen, user]);

  const fetchUserRepos = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("github_token");
      const response = await axios.get(`https://api.github.com/users/${user.login}/repos?sort=updated&per_page=10`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setUserRepos(response.data);
    } catch (error) {
      console.error("Failed to fetch repos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = () => {
    localStorage.removeItem("github_token");
    window.location.reload(); // Refresh to update UI state
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`hide-scrollbar relative w-full max-w-4xl mx-4 max-h-[90vh] overflow-scroll rounded-2xl shadow-2xl ${
        isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200'
      }`}>
        
        {/* Header */}
        <div className={`relative px-8 py-6 border-b ${
          isDarkMode 
            ? 'border-emerald-500/20 bg-gradient-to-r from-emerald-900/20 to-slate-900/20' 
            : 'border-emerald-200/50 bg-gradient-to-r from-emerald-50/50 to-white/50'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src={user.avatar_url}
                  alt="GitHub Avatar"
                  className="w-20 h-20 rounded-2xl shadow-xl ring-4 ring-emerald-400/50"
                />
                <div className="absolute -bottom-1 -right-1 w-8 h-8  rounded-full border-4  bg-gray-400 border-white shadow-lg flex items-center justify-center">
                  {/* <div className="w-2 h-2 bg-white rounded-full"></div> */}

                  <Crown className="w-8 h-8 text-yellow-400 stroke-3" />
                </div>
              </div>
              <div>
                <h2 className={`text-3xl font-bold tracking-tight ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  {user.name || user.login}
                </h2>
                <p className={`text-lg font-medium ${
                  isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                }`}>
                  @{user.login}
                </p>
                {user.bio && (
                  <p className={`text-base mt-2 max-w-md leading-relaxed ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    {user.bio}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className={`cursor-pointer p-3 rounded-xl transition-all duration-200 hover:scale-105 ${
                isDarkMode 
                  ? 'hover:bg-slate-800 text-slate-400 hover:text-white' 
                  : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className={`px-6 py-4 border-b ${isDarkMode ? 'border-slate-700 bg-slate-700/30' : 'border-slate-200 bg-slate-50'}`}>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {[
      { label: 'Followers', value: user.followers, icon: '👥', color: 'from-blue-500 to-blue-700' },
      { label: 'Following', value: user.following, icon: '📈', color: 'from-purple-500 to-purple-700' },
      { label: 'Public Repos', value: user.public_repos, icon: '📂', color: 'from-emerald-500 to-emerald-700' },
      { label: 'Member Since', value: new Date(user.created_at).getFullYear(), icon: '📅', color: 'from-orange-500 to-orange-600' }
    ].map((stat, index) => (
      <div
        key={index}
        className={`
          p-5 text-center rounded-xl transition-all duration-300 border backdrop-blur-md
          hover:scale-105 hover:shadow-xl 
          ${isDarkMode
            ? 'bg-slate-800/40 border-slate-700 text-white'
            : 'bg-white/70 border-slate-200 text-slate-900'
          }
        `}
      >
        {/* Icon Badge */}
        <div className={`mx-auto mb-3 w-10 h-10 flex items-center justify-center rounded-full text-xl shadow-md bg-gradient-to-br ${stat.color} text-white`}>
          {stat.icon}
        </div>

        {/* Stat Value */}
        <div className="text-2xl font-extrabold tracking-tight">
         {stat.label === 'Member Since' ? stat.value : stat.value?.toLocaleString() || 0}

        </div>

        {/* Label */}
        <div className={`text-sm mt-1 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          {stat.label}
        </div>
      </div>
    ))}
  </div>
</div>


        {/* Tab Navigation */}
        <div className={`px-6 border-b ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
          <div className="flex space-x-1">
            {[
              { id: 'overview', label: 'Overview', icon: '👤' },
              { id: 'repos', label: 'Repositories', icon: '📁' },
              { id: 'actions', label: 'Actions', icon: '⚙️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-500'
                    : isDarkMode
                    ? 'border-transparent text-slate-400 hover:text-slate-300'
                    : 'border-transparent text-slate-600 hover:text-slate-800'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* User Info */}
                <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
                  <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    Profile Information
                  </h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Username', value: user.login },
                      { label: 'Full Name', value: user.name || 'Not provided' },
                      { label: 'Email', value: user.email || 'Private' },
                      { label: 'Location', value: user.location || 'Not provided' },
                      { label: 'Company', value: user.company || 'Not provided' },
                      { label: 'Blog/Website', value: user.blog || 'Not provided' }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          {item.label}:
                        </span>
                        <span className={`${isDarkMode ? 'text-slate-200' : 'text-slate-800'} text-right`}>
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activity Summary */}
                <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
                  <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    GitHub Activity
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        Account Type:
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.type === 'User' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.type}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        Profile Visits:
                      </span>
                      <span className={`${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                        Public Profile
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        Member Since:
                      </span>
                      <span className={`${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                        {new Date(user.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        Last Updated:
                      </span>
                      <span className={`${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                        {new Date(user.updated_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'repos' && (
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Recent Repositories
              </h3>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span className="ml-2">Loading repositories...</span>
                </div>
              ) : (
                <div className="space-y-3">
                  {userRepos.map((repo) => (
                    <div
                      key={repo.id}
                      className={`p-4 rounded-xl border transition-all hover:shadow-md ${
                        isDarkMode 
                          ? 'bg-slate-700/50 border-slate-600 hover:bg-slate-700' 
                          : 'bg-slate-50 border-slate-200 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                              {repo.name}
                            </h4>
                            {repo.private && (
                              <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                                Private
                              </span>
                            )}
                          </div>
                          {repo.description && (
                            <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                              {repo.description}
                            </p>
                          )}
                          <div className="flex items-center space-x-4 mt-2 text-sm">
                            {repo.language && (
                              <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                🔵 {repo.language}
                              </span>
                            )}
                            <span className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                              ⭐ {repo.stargazers_count}
                            </span>
                            <span className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                              🍴 {repo.forks_count}
                            </span>
                            <span className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                              Updated {new Date(repo.updated_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-4 p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  ))}
                  {userRepos.length === 0 && !loading && (
                    <div className={`text-center py-8 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      No public repositories found.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'actions' && (
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Account Actions
              </h3>
              
              <div className="grid gap-4">
                {/* View Profile */}
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 rounded-xl border transition-all hover:shadow-md flex items-center justify-between ${
                    isDarkMode 
                      ? 'bg-slate-700/50 border-slate-600 hover:bg-slate-700' 
                      : 'bg-slate-50 border-slate-200 hover:bg-white'
                  }`}
                >
                  <div>
                    <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      View GitHub Profile
                    </h4>
                    <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      Visit your complete GitHub profile
                    </p>
                  </div>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>

                {/* Push Current Project */}
                <button
                  onClick={() => {
                    onClose();
                    // Trigger the push to GitHub function from parent
                    document.dispatchEvent(new CustomEvent('pushToGitHub'));
                  }}
                  className={`p-4 rounded-xl border transition-all hover:shadow-md flex items-center justify-between ${
                    isDarkMode 
                      ? 'bg-slate-700/50 border-slate-600 hover:bg-slate-700' 
                      : 'bg-slate-50 border-slate-200 hover:bg-white'
                  }`}
                >
                  <div className="text-left">
                    <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      Push Current Project
                    </h4>
                    <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      Save your current Pixora project to GitHub
                    </p>
                  </div>
                  <Github className="w-5 h-5" />
                </button>

                {/* Disconnect Account */}
                <button
                  onClick={handleDisconnect}
                  className={`p-4 rounded-xl border transition-all hover:shadow-md flex items-center justify-between border-red-200 bg-red-50 hover:bg-red-100 ${
                    isDarkMode && 'border-red-800 bg-red-900/20 hover:bg-red-900/30'
                  }`}
                >
                  <div className="text-left">
                    <h4 className="font-semibold text-red-700">
                      Disconnect GitHub
                    </h4>
                    <p className="text-sm text-red-600">
                      Remove GitHub integration from Pixora
                    </p>
                  </div>
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}