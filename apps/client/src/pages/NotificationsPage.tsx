import { Layout } from '../components/Layout';
import { Bell, Heart, MessageCircle, Repeat2, UserPlus, Settings } from 'lucide-react';

const NotificationsPage = () => {
  // Mock notification data for UI demonstration
  const mockNotifications = [
    {
      id: 1,
      type: 'like',
      user: { displayName: 'Sarah Chen', username: 'sarahc', avatar: null },
      text: 'liked your quirk',
      content: 'Just shipped a new feature! 🚀',
      timestamp: '2h',
      read: false
    },
    {
      id: 2,
      type: 'follow',
      user: { displayName: 'Alex Kumar', username: 'alexk', avatar: null },
      text: 'followed you',
      timestamp: '4h',
      read: false
    },
    {
      id: 3,
      type: 'retweet',
      user: { displayName: 'Mike Johnson', username: 'mikej', avatar: null },
      text: 'requirked your quirk',
      content: 'Building in public is the best way to learn!',
      timestamp: '1d',
      read: true
    },
    {
      id: 4,
      type: 'reply',
      user: { displayName: 'Emma Wilson', username: 'emmaw', avatar: null },
      text: 'replied to your quirk',
      content: 'Totally agree! Great insights.',
      timestamp: '2d',
      read: true
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like': return <Heart size={20} className="text-red-500" />;
      case 'retweet': return <Repeat2 size={20} className="text-green-500" />;
      case 'reply': return <MessageCircle size={20} className="text-blue-500" />;
      case 'follow': return <UserPlus size={20} className="text-purple-500" />;
      default: return <Bell size={20} className="text-gray-500" />;
    }
  };

  const getUserInitial = (displayName: string) => {
    return displayName.charAt(0).toUpperCase();
  };

  return (
    <Layout>
      {/* Header */}
      <div className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-black/60 bg-black/80 border-b border-gray-800">
        <div className="px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Notifications</h1>
            <p className="text-sm text-gray-400">Stay updated with your activity</p>
          </div>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Settings size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex border-b border-gray-800">
          <button className="flex-1 py-3 text-center font-medium text-white relative">
            All
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-12 bg-purple-500 rounded-full" />
          </button>
          <button className="flex-1 py-3 text-center font-medium text-gray-400 hover:text-gray-300">
            Mentions
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="divide-y divide-gray-800/60">
        {mockNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 hover:bg-white/[0.02] transition-colors cursor-pointer ${
              !notification.read ? 'bg-purple-500/5 border-r-2 border-purple-500' : ''
            }`}
          >
            <div className="flex gap-4">
              {/* Notification Icon */}
              <div className="flex-shrink-0 mt-1">
                {getNotificationIcon(notification.type)}
              </div>

              {/* User Avatar */}
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-indigo-400 p-0.5">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {getUserInitial(notification.user.displayName)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Notification Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-white">
                    {notification.user.displayName}
                  </span>
                  <span className="text-gray-400">
                    @{notification.user.username}
                  </span>
                  <span className="text-gray-500">·</span>
                  <span className="text-gray-500 text-sm">
                    {notification.timestamp}
                  </span>
                </div>
                
                <p className="text-gray-300 mb-2">
                  {notification.text}
                </p>

                {notification.content && (
                  <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
                    <p className="text-gray-300 text-sm">
                      {notification.content}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Coming Soon Notice */}
      <div className="text-center py-12">
        <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-purple-500/10 flex items-center justify-center">
          <Bell className="h-8 w-8 text-purple-400" />
        </div>
        <h3 className="text-xl font-bold mb-2">More notifications coming soon!</h3>
        <p className="text-gray-400 max-w-md mx-auto">
          We're working on real-time notifications, push notifications, and more notification types.
        </p>
      </div>

      {/* Mobile padding bottom */}
      <div className="lg:hidden h-16" />
    </Layout>
  );
};

export default NotificationsPage;
