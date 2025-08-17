import { Layout } from '../components/Layout';
import { Search, Settings, Plus, MessageCircle } from 'lucide-react';

const MessagesPage = () => {
  // Mock conversation data for UI demonstration
  const mockConversations = [
    {
      id: 1,
      user: { displayName: 'Sarah Chen', username: 'sarahc', avatar: null },
      lastMessage: 'Hey! How\'s the new project going?',
      timestamp: '2h',
      unread: true,
      online: true
    },
    {
      id: 2,
      user: { displayName: 'Alex Kumar', username: 'alexk', avatar: null },
      lastMessage: 'Thanks for the follow! Love your content.',
      timestamp: '1d',
      unread: false,
      online: false
    },
    {
      id: 3,
      user: { displayName: 'Mike Johnson', username: 'mikej', avatar: null },
      lastMessage: 'Let\'s collaborate on something soon!',
      timestamp: '3d',
      unread: false,
      online: true
    },
    {
      id: 4,
      user: { displayName: 'Emma Wilson', username: 'emmaw', avatar: null },
      lastMessage: 'That was an amazing quirk about React!',
      timestamp: '1w',
      unread: false,
      online: false
    }
  ];

  const getUserInitial = (displayName: string) => {
    return displayName.charAt(0).toUpperCase();
  };

  return (
    <Layout>
      {/* Header */}
      <div className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-black/60 bg-black/80 border-b border-gray-800">
        <div className="px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Messages</h1>
            <p className="text-sm text-gray-400">Your conversations</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <Settings size={20} className="text-gray-400" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <Plus size={20} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search messages"
              className="w-full bg-gray-900/60 border border-gray-800 rounded-full py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-gray-900/80 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Conversations List */}
      <div className="divide-y divide-gray-800/60">
        {mockConversations.map((conversation) => (
          <div
            key={conversation.id}
            className="p-4 hover:bg-white/[0.02] transition-colors cursor-pointer"
          >
            <div className="flex gap-4">
              {/* User Avatar with online indicator */}
              <div className="flex-shrink-0 relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-indigo-400 p-0.5">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {getUserInitial(conversation.user.displayName)}
                    </span>
                  </div>
                </div>
                {conversation.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 bg-green-500 rounded-full border-2 border-black" />
                )}
              </div>

              {/* Conversation Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white truncate">
                      {conversation.user.displayName}
                    </h3>
                    <span className="text-gray-500 text-sm">
                      @{conversation.user.username}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-sm">
                      {conversation.timestamp}
                    </span>
                    {conversation.unread && (
                      <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    )}
                  </div>
                </div>
                
                <p className={`text-sm truncate ${
                  conversation.unread ? 'text-white font-medium' : 'text-gray-400'
                }`}>
                  {conversation.lastMessage}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Coming Soon Notice */}
      <div className="text-center py-12">
        <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-purple-500/10 flex items-center justify-center">
          <MessageCircle className="h-8 w-8 text-purple-400" />
        </div>
        <h3 className="text-xl font-bold mb-2">Direct Messages coming soon!</h3>
        <p className="text-gray-400 max-w-md mx-auto">
          We're building a real-time messaging system with media sharing, reactions, and more.
        </p>
      </div>

      {/* Mobile padding bottom */}
      <div className="lg:hidden h-16" />
    </Layout>
  );
};

export default MessagesPage;
