import { useState } from 'react';
import { Image, Smile, Calendar, MapPin, Send } from 'lucide-react';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';

export const TweetComposer = () => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isLoading) return;

    setIsLoading(true);
    try {
      await api.post('/tweets', { text: text.trim() });
      setText('');
      // TODO: Add tweet to timeline or refresh
      window.location.reload();
    } catch (error) {
      console.error('Failed to post tweet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const remainingChars = 280 - text.length;
  const isOverLimit = remainingChars < 0;
  const isNearLimit = remainingChars <= 20;

  // Get user initial
  const getUserInitial = () => {
    if (!user) return 'U';
    return user.displayName?.charAt(0) || user.username?.charAt(0) || 'U';
  };

  return (
    <div className="relative">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-indigo-500/5 rounded-2xl" />
      
      <div className="relative border border-gray-800/60 bg-black/40 backdrop-blur-sm rounded-2xl p-4 hover:border-gray-700/60 transition-all duration-200">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4">
            {/* Avatar - Real user initial */}
            <div className="flex-shrink-0">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-indigo-400 p-0.5">
                <div className="h-full w-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                  {user?.avatar && user.avatar !== 'default_avatar_url' ? (
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
                  <div className={`${user?.avatar && user.avatar !== 'default_avatar_url' ? 'hidden' : ''} w-full h-full flex items-center justify-center`}>
                    <span className="text-white font-semibold text-lg">
                      {getUserInitial()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              {/* Text Input */}
              <div className="relative">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="What's happening?!"
                  className="w-full bg-transparent text-xl placeholder-gray-500 resize-none outline-none text-white min-h-[60px] leading-relaxed"
                  maxLength={300}
                />
                
                {/* Character count indicator */}
                {text && (
                  <div className="absolute bottom-2 right-2">
                    <div className={`text-xs px-2 py-1 rounded-full transition-colors ${
                      isOverLimit 
                        ? 'bg-red-500/20 text-red-400' 
                        : isNearLimit 
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-gray-800/60 text-gray-400'
                    }`}>
                      {remainingChars}
                    </div>
                  </div>
                )}
              </div>

              {/* Media Options & Post Button */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-800/40">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="p-2 rounded-full hover:bg-purple-500/10 text-purple-400 hover:text-purple-300 transition-colors disabled:opacity-50"
                    disabled={isLoading}
                    title="Add image"
                  >
                    <Image size={18} />
                  </button>
                  <button
                    type="button"
                    className="p-2 rounded-full hover:bg-purple-500/10 text-purple-400 hover:text-purple-300 transition-colors disabled:opacity-50"
                    disabled={isLoading}
                    title="Add emoji"
                  >
                    <Smile size={18} />
                  </button>
                  <button
                    type="button"
                    className="p-2 rounded-full hover:bg-purple-500/10 text-purple-400 hover:text-purple-300 transition-colors disabled:opacity-50"
                    disabled={isLoading}
                    title="Schedule"
                  >
                    <Calendar size={18} />
                  </button>
                  <button
                    type="button"
                    className="p-2 rounded-full hover:bg-purple-500/10 text-purple-400 hover:text-purple-300 transition-colors disabled:opacity-50"
                    disabled={isLoading}
                    title="Add location"
                  >
                    <MapPin size={18} />
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={!text.trim() || isLoading || isOverLimit}
                  className={`inline-flex items-center gap-2 px-6 py-2 rounded-full font-bold text-sm transition-all ${
                    !text.trim() || isLoading || isOverLimit
                      ? 'bg-purple-500/20 text-purple-300/50 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white shadow-lg active:scale-95 hover:shadow-purple-500/25'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                      <span>Posting...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Quirk</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
