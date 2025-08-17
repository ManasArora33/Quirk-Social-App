import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { Layout } from '../components/Layout';
import { LoaderCircle, Sparkles } from 'lucide-react';
import { TweetCard } from '../components/TweetCard';
import { TweetComposer } from '../components/TweetComposer';
import { useAuth } from '../context/AuthContext';

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

const HomePage = () => {
  const [allTweets, setAllTweets] = useState<Tweet[]>([]);
  const [timelineTweets, setTimelineTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'foryou' | 'following'>('foryou');
  const navigate = useNavigate();
  const { user } = useAuth();

  // Keep both tabs' lists in sync when a like state changes
  const handleLikeChange = (tweetId: string, liked: boolean, likeCount: number) => {
    setAllTweets(prev => prev.map(t => t._id === tweetId ? { ...t, likedByMe: liked, likeCount } : t));
    setTimelineTweets(prev => prev.map(t => t._id === tweetId ? { ...t, likedByMe: liked, likeCount } : t));
  };

  // Auth check
  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  // Fetch all tweets (For you section)
  const fetchAllTweets = async () => {
    try {
      const response = await api.get('/tweets?page=1&limit=100'); 
      setAllTweets(response.data.tweets); // Your endpoint returns { tweets, currentPage, totalPages }
    } catch (err) {
      console.error('Failed to fetch all tweets:', err);
      setAllTweets([]);
    }
  };

  // Fetch timeline tweets (Following section)
  const fetchTimelineTweets = async () => {
    try {
      const response = await api.get('/tweets/timeline?page=1&limit=100');
      setTimelineTweets(response.data);
    } catch (err) {
      console.error('Failed to fetch timeline:', err);
      setTimelineTweets([]);
    }
  };

  // Data fetch when user is authenticated
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        await Promise.all([fetchAllTweets(), fetchTimelineTweets()]);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch tweets. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // Get current tweets based on active tab
  const getCurrentTweets = () => {
    return activeTab === 'foryou' ? allTweets : timelineTweets;
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <LoaderCircle className="animate-spin h-8 w-8 text-purple-400" />
      </div>
    );
  }

  return (
    <Layout>
      {/* Sticky modern header */}
      <div className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-black/60 bg-black/80 border-b border-gray-800">
        <div className="p-4 flex items-center justify-between">
          <h1 className="text-xl font-extrabold tracking-tight">Timeline</h1>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white px-3 py-1.5 rounded-full border border-gray-800 hover:border-gray-700 transition"
            title="Top"
          >
            <Sparkles size={16} className="text-purple-400" />
            <span>For you</span>
          </button>
        </div>

        {/* Functional Tabs */}
        <div className="grid grid-cols-2 text-center text-sm">
          <button
            onClick={() => setActiveTab('foryou')}
            className={`py-3 font-medium relative transition-colors ${
              activeTab === 'foryou' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            For you
            {activeTab === 'foryou' && (
              <span className="absolute left-0 right-0 -bottom-px mx-auto h-[3px] w-12 rounded-full bg-purple-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('following')}
            className={`py-3 font-medium relative transition-colors ${
              activeTab === 'following' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Following
            {activeTab === 'following' && (
              <span className="absolute left-0 right-0 -bottom-px mx-auto h-[3px] w-12 rounded-full bg-purple-500" />
            )}
          </button>
        </div>
      </div>

      {/* Composer - Only show in "For you" tab */}
      {activeTab === 'foryou' && (
        <div className="px-4 pb-2 pt-3">
          <div className="rounded-2xl border border-gray-800 bg-gradient-to-b from-black to-[#0b0b0b] shadow-[0_0_0_1px_rgba(255,255,255,0.02)] hover:shadow-[0_0_0_1px_rgba(168,85,247,0.25)] transition-shadow">
            <TweetComposer />
          </div>
        </div>
      )}

      {/* Timeline */}
      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <LoaderCircle className="animate-spin h-8 w-8 text-purple-400" />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center p-8">{error}</div>
      ) : (
        <div className="divide-y divide-gray-900/60">
          {getCurrentTweets()?.length > 0 ? (
            getCurrentTweets().map((tweet) => (
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
            <div className="text-center px-6 py-16">
              <div className="mx-auto mb-4 h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold">
                {activeTab === 'foryou' ? 'No tweets yet' : 'No tweets from people you follow'}
              </h3>
              <p className="text-gray-400 mt-1">
                {activeTab === 'foryou' 
                  ? 'Be the first to share something!' 
                  : 'Follow some people to see their tweets here!'
                }
              </p>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default HomePage;
