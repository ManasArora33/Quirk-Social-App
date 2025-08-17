import { Home, User, Bell, Mail, LogOut, Plus, Search, MoreHorizontal, Menu, X, MessageSquareQuote } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SidebarLink = ({
  Icon,
  text,
  to = '#',
  active = false,
  onClick,
}: {
  Icon: React.ElementType;
  text: string;
  to?: string;
  active?: boolean;
  onClick?: () => void;
}) => (
  <Link
    to={to}
    onClick={onClick}
    className={`group flex items-center gap-4 text-xl px-3 py-3 rounded-full transition w-fit
      ${active ? 'bg-white/10 text-white font-bold' : 'hover:bg-white/5 text-gray-200 hover:text-white'}
    `}
  >
    <Icon size={26} className="shrink-0" />
    <span className="hidden xl:block font-normal">{text}</span>
  </Link>
);

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      logout();
    } catch (e) {
      console.error(e);
    }
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const toggleProfileMenu = () => setProfileMenuOpen(!profileMenuOpen);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (profileMenuOpen && !target.closest('.profile-menu-container')) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileMenuOpen]);

  // Helper function to check if route is active
  // Helper function to check if route is active - UPDATED
  const isActiveRoute = (path: string) => {
    if (path === '/home') return location.pathname === '/home';

    // Special handling for profile route - only highlight if it's user's own profile
    if (path === '/profile') {
      if (!user) return false;
      return location.pathname === `/profile/${user.username}`;
    }

    return location.pathname.startsWith(path);
  };


  return (
    <div className="bg-black text-white min-h-screen">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800 px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <MessageSquareQuote size={32} className="text-purple-400" />
          <span className="text-xl font-black tracking-tight">Quirk</span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/90 backdrop-blur-sm">
          <div className="fixed left-0 top-0 h-full w-80 bg-black border-r border-gray-800 pt-20">
            <div className="flex flex-col justify-between h-full">
              <div className="px-4 space-y-2">
                <nav className="space-y-1">
                  <Link
                    to="/home"
                    onClick={closeMobileMenu}
                    className={`group flex items-center gap-4 text-xl px-3 py-3 rounded-full transition ${isActiveRoute('/home')
                      ? 'bg-white/10 text-white font-bold'
                      : 'hover:bg-white/5 text-gray-200 hover:text-white'
                      }`}
                  >
                    <Home size={26} />
                    <span>Home</span>
                  </Link>
                  <Link
                    to="/notifications"
                    onClick={closeMobileMenu}
                    className={`group flex items-center gap-4 text-xl px-3 py-3 rounded-full transition ${isActiveRoute('/notifications')
                      ? 'bg-white/10 text-white font-bold'
                      : 'hover:bg-white/5 text-gray-200 hover:text-white'
                      }`}
                  >
                    <Bell size={26} />
                    <span>Notifications</span>
                  </Link>
                  <Link
                    to="/messages"
                    onClick={closeMobileMenu}
                    className={`group flex items-center gap-4 text-xl px-3 py-3 rounded-full transition ${isActiveRoute('/messages')
                      ? 'bg-white/10 text-white font-bold'
                      : 'hover:bg-white/5 text-gray-200 hover:text-white'
                      }`}
                  >
                    <Mail size={26} />
                    <span>Messages</span>
                  </Link>
                  <Link
                    to={user ? `/profile/${user.username}` : '/profile'}
                    onClick={closeMobileMenu}
                    className={`group flex items-center gap-4 text-xl px-3 py-3 rounded-full transition ${isActiveRoute('/profile')
                      ? 'bg-white/10 text-white font-bold'
                      : 'hover:bg-white/5 text-gray-200 hover:text-white'
                      }`}
                  >
                    <User size={26} />
                    <span>Profile</span>
                  </Link>
                </nav>
                <div className="pt-4">
                  <button
                    onClick={closeMobileMenu}
                    className="w-full py-3 rounded-full font-bold text-white bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
                  >
                    Quirk
                  </button>
                </div>
              </div>

              {/* Mobile User Profile */}
              {user && (
                <div className="px-4 pb-8">
                  <div className="border-t border-gray-800 pt-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="relative">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-indigo-400 p-0.5">
                          <div className="h-full w-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                            {user.avatar && user.avatar !== 'default_avatar_url' ? (
                              <img
                                src={user.avatar}
                                alt=""
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  const fallbackDiv = e.currentTarget.nextElementSibling as HTMLElement;
                                  if (fallbackDiv) fallbackDiv.classList.remove('hidden');
                                }}
                              />
                            ) : null}
                            <div className={`${user.avatar && user.avatar !== 'default_avatar_url' ? 'hidden' : ''} w-full h-full flex items-center justify-center`}>
                              <span className="text-white font-semibold text-lg">
                                {user.displayName?.charAt(0) || user.username?.charAt(0) || 'U'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-white">{user.displayName || user.username}</p>
                        <p className="text-sm text-gray-400">@{user.username}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      Log out @{user.username}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-screen-xl mx-auto flex">
        {/* Desktop Left Sidebar */}
        <div className="hidden lg:block w-64 xl:w-72 flex-shrink-0 px-3">
          <div className="fixed h-full flex flex-col justify-between py-2" style={{ width: 'inherit' }}>
            <div className="space-y-2">
              {/* Logo */}
              <div className="px-3 py-3 mb-4">
                <Link to="/" className="inline-flex items-center gap-2 text-xl font-black hover:opacity-80 transition-opacity">
                  <MessageSquareQuote size={32} className="text-purple-400" />
                  <span className="hidden xl:block tracking-tight">Quirk</span>
                </Link>
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                <SidebarLink
                  Icon={Home}
                  text="Home"
                  to="/home"
                  active={isActiveRoute('/home')}
                />
                <SidebarLink
                  Icon={Bell}
                  text="Notifications"
                  to="/notifications"
                  active={isActiveRoute('/notifications')}
                />
                <SidebarLink
                  Icon={Mail}
                  text="Messages"
                  to="/messages"
                  active={isActiveRoute('/messages')}
                />
                <SidebarLink
                  Icon={User}
                  text="Profile"
                  to={user ? `/profile/${user.username}` : '/profile'}
                  active={isActiveRoute('/profile')}
                />
              </nav>

              {/* Quirk Button */}
              <div className="pt-4">
                <button className="w-full xl:w-auto xl:px-8 py-3 rounded-full font-bold text-white bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 shadow-lg active:scale-95 transition-all">
                  <span className="hidden xl:block">Quirk</span>
                  <Plus size={20} className="xl:hidden mx-auto" />
                </button>
              </div>
            </div>

            {/* Desktop Bottom Profile - Click-based menu */}
            {user && (
              <div className="px-2 pb-6 mr-4 profile-menu-container relative">
                <div
                  className="flex items-center justify-between rounded-2xl hover:bg-white/[0.03] transition-all duration-200 p-3 cursor-pointer border border-transparent hover:border-gray-800/50"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-indigo-400 p-0.5">
                        <div className="h-full w-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                          {user.avatar && user.avatar !== 'default_avatar_url' ? (
                            <img
                              src={user.avatar}
                              alt=""
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                const fallbackDiv = e.currentTarget.nextElementSibling as HTMLElement;
                                if (fallbackDiv) fallbackDiv.classList.remove('hidden');
                              }}
                            />
                          ) : null}
                          <div className={`${user.avatar && user.avatar !== 'default_avatar_url' ? 'hidden' : ''} w-full h-full flex items-center justify-center`}>
                            <span className="text-sm font-semibold text-white">
                              {user.displayName?.charAt(0) || user.username?.charAt(0) || 'U'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 rounded-full border-2 border-black" />
                    </div>
                    <div className="hidden xl:block min-w-0 flex-1">
                      <p className="text-sm font-bold text-white truncate">
                        {user.displayName || user.username}
                      </p>
                      <p className="text-xs text-gray-400 truncate">@{user.username}</p>
                    </div>
                  </div>
                  <div className="hidden xl:block">
                    <button
                      onClick={toggleProfileMenu}
                      className={`p-2 rounded-full transition-colors ${profileMenuOpen ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-gray-300 hover:bg-white/5'
                        }`}
                    >
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </div>

                {/* Click-based dropdown menu */}
                {profileMenuOpen && (
                  <div className="absolute bottom-full left-0 right-4 mb-2 z-50">
                    <div className="bg-black border border-gray-800 rounded-2xl shadow-2xl backdrop-blur-sm overflow-hidden">
                      <div className="p-3 border-b border-gray-800/40">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-indigo-400 p-0.5">
                            <div className="h-full w-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                              {user.avatar && user.avatar !== 'default_avatar_url' ? (
                                <img
                                  src={user.avatar}
                                  alt=""
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    const fallbackDiv = e.currentTarget.nextElementSibling as HTMLElement;
                                    if (fallbackDiv) fallbackDiv.classList.remove('hidden');
                                  }}
                                />
                              ) : null}
                              <div className={`${user.avatar && user.avatar !== 'default_avatar_url' ? 'hidden' : ''} w-full h-full flex items-center justify-center`}>
                                <span className="text-sm font-semibold text-white">
                                  {user.displayName?.charAt(0) || user.username?.charAt(0) || 'U'}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">
                              {user.displayName || user.username}
                            </p>
                            <p className="text-xs text-gray-400">@{user.username}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <Link
                          to={`/profile/${user.username}`}
                          onClick={() => setProfileMenuOpen(false)}
                          className="w-full flex items-center gap-3 text-left px-3 py-2 text-sm text-white hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <User size={16} />
                          <span>View Profile</span>
                        </Link>
                        <button
                          onClick={() => {
                            handleLogout();
                            setProfileMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-3 text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <LogOut size={16} />
                          <span>Log out @{user.username}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 max-w-full lg:max-w-[600px] min-h-screen border-x border-gray-800/60 bg-black">
          {children}
        </main>

        {/* Desktop Right Sidebar */}
        <div className="hidden xl:block w-80 flex-shrink-0 pl-8 pr-8">
          <div className="sticky top-0 py-4 space-y-6">
            {/* Search */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-3xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-800/50 p-1 group hover:border-gray-700/60 transition-all">
                <div className="flex items-center gap-3 px-4 py-3">
                  <Search size={18} className="text-gray-400 group-hover:text-purple-400 transition-colors" />
                  <input
                    placeholder="Search"
                    className="bg-transparent outline-none w-full text-[15px] placeholder:text-gray-500 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Trends */}
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-800/40 overflow-hidden">
              <div className="p-4 border-b border-gray-800/40">
                <h2 className="text-xl font-extrabold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Trends for you
                </h2>
              </div>
              <div className="divide-y divide-gray-800/30">
                {[
                  { trend: '#javascript', category: 'Technology', posts: '125K' },
                  { trend: '#react', category: 'Programming', posts: '89K' },
                  { trend: '#mongodb', category: 'Database', posts: '67K' }
                ].map((item, i) => (
                  <button
                    key={i}
                    className="w-full text-left px-4 py-3 hover:bg-white/[0.02] transition-colors group"
                  >
                    <p className="text-gray-400 text-[13px] group-hover:text-gray-300">
                      Trending in {item.category}
                    </p>
                    <p className="font-bold text-[15px] text-white group-hover:text-purple-300 transition-colors">
                      {item.trend}
                    </p>
                    <p className="text-gray-400 text-[13px]">{item.posts} Quirks</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Who to follow */}
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-800/40 overflow-hidden">
              <div className="p-4 border-b border-gray-800/40">
                <h2 className="text-xl font-extrabold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Who to follow
                </h2>
              </div>
              <div className="divide-y divide-gray-800/30">
                {[
                  { name: 'React', handle: 'reactjs', verified: true },
                  { name: 'Vercel', handle: 'vercel', verified: true }
                ].map((user, i) => (
                  <div key={i} className="flex items-center justify-between px-4 py-4 hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500/30 to-indigo-500/30 border border-gray-700/50 flex items-center justify-center">
                        <span className="text-sm font-bold text-purple-300">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-[15px] font-bold text-white">{user.name}</p>
                        <p className="text-[13px] text-gray-400">@{user.handle}</p>
                      </div>
                    </div>
                    <button className="px-4 py-1.5 rounded-full text-[14px] font-bold bg-white text-black hover:bg-gray-200 active:scale-95 transition-all">
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation - Fixed Profile Link */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-t border-gray-800 px-4 py-2">
        <div className="flex items-center justify-around">
          <Link
            to="/home"
            className={`p-3 rounded-full transition-colors ${isActiveRoute('/home') ? 'bg-white/10 text-white' : 'hover:bg-white/10'
              }`}
          >
            <Home size={24} />
          </Link>
          <Link
            to="/notifications"
            className={`p-3 rounded-full transition-colors ${isActiveRoute('/notifications') ? 'bg-white/10 text-white' : 'hover:bg-white/10'
              }`}
          >
            <Bell size={24} />
          </Link >
          <Link
            to="/home"
            className="p-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full hover:from-purple-600 hover:to-indigo-600 transition-all"
            onClick={() => {
              // Focus the tweet composer when navigating to home
              setTimeout(() => {
                const composer = document.querySelector('textarea[placeholder*="What\'s happening"]');
                if (composer) {
                  (composer as HTMLTextAreaElement).focus();
                }
              }, 100);
            }}
          >
            <Plus size={20} />
          </Link>
          <Link
            to="/messages"
            className={`p-3 rounded-full transition-colors ${isActiveRoute('/messages') ? 'bg-white/10 text-white' : 'hover:bg-white/10'
              }`}
          >
            <Mail size={24} />
          </Link>
          <Link
            to={user ? `/profile/${user.username}` : '/profile'}
            className={`p-3 rounded-full transition-colors ${isActiveRoute('/profile') ? 'bg-white/10 text-white' : 'hover:bg-white/10'
              }`}
          >
            <User size={24} />
          </Link>
        </div>
      </div>

      {/* Mobile padding bottom */}
      <div className="lg:hidden h-16" />
    </div>
  );
};
