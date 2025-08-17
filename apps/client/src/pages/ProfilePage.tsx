import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Link as LinkIcon, MoreHorizontal } from 'lucide-react';
import api from '../lib/api';
import { Layout } from '../components/Layout';
import { LoaderCircle } from 'lucide-react';
import { TweetCard } from '../components/TweetCard';

interface UserProfile {
  _id: string;
  displayName: string;
  username: string;
  email: string;
  bio?: string;
  location?: string;
  website?: string;
  avatar?: string;
  banner?: string;
  createdAt: string;
  followersCount?: number;
  followingCount?: number;
  tweetsCount?: number;
}

interface Tweet {
  _id: string;
  text: string;
  author: {
    displayName: string;
    username: string;
    avatar?: string;
  };
  createdAt: string;
  likeCount: number;
  likedByMe?: boolean;
}

const ProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [profileUser, setProfileUser] = useState<UserProfile | null>(null);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [tweetsLoading, setTweetsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  // Keep profile tweets in sync with like changes
  const handleLikeChange = (tweetId: string, liked: boolean, likeCount: number) => {
    setTweets(prev => prev.map(t => t._id === tweetId ? { ...t, likedByMe: liked, likeCount } : t));
  };

  // Current user fetch karo
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get('/auth/me');
        setCurrentUser(response.data.user);
      } catch {
        navigate('/login', { replace: true });
      }
    };
    checkAuth();
  }, [navigate]);

  // Profile data fetch karo - own ya other user
  useEffect(() => {
    if (!currentUser || !username) return;

    const fetchProfile = async () => {
      setLoading(true);
      try {
        if (username === currentUser.username) {
          // Own profile - current user data use karo
          setProfileUser({
            ...currentUser,
            followersCount: currentUser.followersCount || 0, // Mock data
            followingCount: currentUser.followingCount || 0,
            tweetsCount: currentUser.tweetsCount || 0,
            bio: currentUser.bio || "Welcome to my profile! 🚀",
            location: currentUser.location || "Somewhere on Earth 🌍",
            createdAt: currentUser.createdAt || new Date().toISOString()
          });
        } else {
          // Other user's profile - backend endpoint use karo
          const response = await api.get(`/users/${username}`);
          setProfileUser(response.data.user);
          setIsFollowing(response.data.isFollowing || false);
        }
      } catch (err) {
        setError('User not found');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [currentUser, username]);

  useEffect(() => {
    if (!profileUser) return;

    const fetchUserTweets = async () => {
      setTweetsLoading(true);
      try {
        const response = await api.get(`/tweets/user/${profileUser._id}`);
        setTweets(response.data);

      } catch (err) {
        console.error('Failed to fetch user tweets:', err);
        setTweets([]);
      } finally {
        setTweetsLoading(false);
      }
    };

    fetchUserTweets();
  }, [profileUser?._id]); // FIXED: Only depend on profileUser._id, not entire profileUser object

  // Follow/Unfollow handler
  const handleFollowToggle = async () => {
    if (!profileUser || followLoading || !currentUser) return;

    setFollowLoading(true);
    try {
      if (isFollowing) {
        await api.delete(`/users/${profileUser._id}/follow`);
        setIsFollowing(false);
        setProfileUser(prev => prev ? {
          ...prev,
          followersCount: (prev.followersCount || 0) - 1
        } : null);
      } else {
        await api.post(`/users/${profileUser._id}/follow`);
        setIsFollowing(true);
        setProfileUser(prev => prev ? {
          ...prev,
          followersCount: (prev.followersCount || 0) + 1
        } : null);
      }
    } catch (error) {
      console.error('Failed to toggle follow:', error);
    } finally {
      setFollowLoading(false);
    }
  };

  const formatJoinDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  };

  const isOwnProfile = currentUser && profileUser && currentUser._id === profileUser._id;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <LoaderCircle className="animate-spin h-8 w-8 text-purple-400" />
      </div>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">User not found</h1>
          <button
            onClick={() => navigate('/home')}
            className="text-purple-400 hover:text-purple-300 underline"
          >
            Go back to home
          </button>
        </div>
      </Layout>
    );
  }

  if (!profileUser) return null;

  return (
    <Layout>
      {/* Header */}
      <div className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-black/60 bg-black/80 border-b border-gray-800">
        <div className="px-4 py-3 flex items-center gap-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-bold">{profileUser.displayName}</h1>
            {/* FIXED: Show dynamic tweet count */}
            <p className="text-sm text-gray-400">{tweets.length} Quirks</p>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div>
        {/* Banner */}
        <div className="h-48 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-indigo-500/20 relative">
          {profileUser.banner && (
            <img
              src={profileUser.banner}
              alt="Profile banner"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Profile Info */}
        <div className="px-4 pb-4">
          <div className="flex items-end justify-between mb-4 -mt-16">
            {/* Profile Picture - FIXED */}
            <div className="relative">
              <div className="h-32 w-32 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-indigo-400 p-1 bg-black border-4 border-black">
                <div className="h-full w-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                  {profileUser.avatar && profileUser.avatar !== 'default_avatar_url' ? (
                    <img
                      src={profileUser.avatar}
                      alt=""
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // If image fails to load, show fallback
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  {/* Fallback for no avatar or broken image */}
                  <div className={`w-full h-full rounded-full bg-gray-800 flex items-center justify-center ${profileUser.avatar && profileUser.avatar !== 'default_avatar_url' ? 'hidden' : ''}`}>
                    <span className="text-white font-bold text-3xl">
                      {profileUser.displayName?.charAt(0) || profileUser.username?.charAt(0) || 'U'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mb-4">
              {isOwnProfile ? (
                <button className="px-6 py-2 rounded-full border border-gray-600 text-white font-semibold hover:bg-white/10 transition-colors">
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button className="p-2 border border-gray-600 rounded-full hover:bg-white/10 transition-colors">
                    <MoreHorizontal size={20} />
                  </button>
                  <button
                    onClick={handleFollowToggle}
                    disabled={followLoading}
                    className={`px-6 py-2 rounded-full font-semibold transition-colors disabled:opacity-50 ${isFollowing
                        ? 'bg-transparent border border-gray-600 text-white hover:bg-red-600 hover:border-red-600 hover:text-white'
                        : 'bg-white text-black hover:bg-gray-200'
                      }`}
                  >
                    {followLoading ? (
                      <LoaderCircle className="animate-spin h-4 w-4" />
                    ) : isFollowing ? (
                      'Following'
                    ) : (
                      'Follow'
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* User Details */}
          <div className="space-y-3">
            <div>
              <h2 className="text-xl font-bold">{profileUser.displayName}</h2>
              <p className="text-gray-400">@{profileUser.username}</p>
            </div>

            {profileUser.bio && (
              <p className="text-white leading-relaxed">{profileUser.bio}</p>
            )}

            {/* Metadata */}
            <div className="flex flex-wrap gap-4 text-gray-400 text-sm">
              {profileUser.location && (
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  <span>{profileUser.location}</span>
                </div>
              )}
              {profileUser.website && (
                <div className="flex items-center gap-1">
                  <LinkIcon size={16} />
                  <a
                    href={profileUser.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:underline"
                  >
                    {profileUser.website}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>Joined {formatJoinDate(profileUser.createdAt)}</span>
              </div>
            </div>

            {/* Following/Followers */}
            <div className="flex gap-6 text-sm">
              <button className="hover:underline">
                <span className="font-bold text-white">{profileUser.followingCount || 0}</span>
                <span className="text-gray-400 ml-1">Following</span>
              </button>
              <button className="hover:underline">
                <span className="font-bold text-white">{profileUser.followersCount || 0}</span>
                <span className="text-gray-400 ml-1">Followers</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-800">
          <div className="px-4">
            <div className="flex">
              <button className="flex-1 py-4 text-center font-medium text-white relative">
                Quirks
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-16 bg-purple-500 rounded-full" />
              </button>
              <button className="flex-1 py-4 text-center font-medium text-gray-400 hover:text-gray-300">
                Replies
              </button>
              <button className="flex-1 py-4 text-center font-medium text-gray-400 hover:text-gray-300">
                Likes
              </button>
            </div>
          </div>
        </div>

        {/* Tweets */}
        <div className="divide-y divide-gray-900/60">
          {tweetsLoading ? (
            <div className="flex justify-center items-center py-8">
              <LoaderCircle className="animate-spin h-6 w-6 text-purple-400" />
            </div>
          ) : tweets.length > 0 ? (
            tweets.map((tweet) => (
              <div
                key={tweet._id}
                className="transition hover:bg-white/[0.02] duration-200"
              >
                <div className="px-4">
                  <TweetCard tweet={tweet} onLikeChange={handleLikeChange} />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <h3 className="text-lg font-semibold mb-2">No Quirks yet</h3>
              <p className="text-gray-400">
                {isOwnProfile
                  ? "You haven't quirked anything yet"
                  : `@${profileUser.username} hasn't quirked anything yet`}
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
