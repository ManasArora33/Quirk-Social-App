import {  MessageCircle, Repeat2, Heart, Share } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../lib/api';

interface Tweet {
  _id: string;
  text: string;
  author: {
    displayName: string;
    username: string;
    avatar?: string; // "default_avatar_url" ya custom image URL
  };
  createdAt: string;
  likeCount: number;
  likedByMe?: boolean;
}

interface TweetCardProps {
  tweet: Tweet;
  onLikeChange?: (tweetId: string, liked: boolean, likeCount: number) => void;
}

export const TweetCard = ({ tweet, onLikeChange }: TweetCardProps) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState<boolean>(!!tweet.likedByMe);
  const [likeCount, setLikeCount] = useState<number>(tweet.likeCount ?? 0);
  const [likeLoading, setLikeLoading] = useState(false);

  // Keep local state in sync when props change (e.g., after refetch or parent update)
  useEffect(() => {
    setLiked(!!tweet.likedByMe);
    setLikeCount(tweet.likeCount ?? 0);
  }, [tweet._id, tweet.likedByMe, tweet.likeCount]);

  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling to parent elements
    navigate(`/profile/${tweet.author.username}`);
  };

  // Get user's first letter for fallback
  const getUserInitial = () => {
    return tweet.author.displayName?.charAt(0) || tweet.author.username?.charAt(0) || 'U';
  };

  const handleToggleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (likeLoading) return;
    const prevLiked = liked;
    const prevCount = likeCount;
    try {
      setLikeLoading(true);
      if (prevLiked) {
        // optimistic unlike
        setLiked(false);
        setLikeCount(prevCount - 1);
        const res = await api.delete(`/tweets/${tweet._id}/like`);
        const newLiked = res.data.liked as boolean;
        const newCount = res.data.likeCount as number;
        setLiked(newLiked);
        setLikeCount(newCount);
        onLikeChange?.(tweet._id, newLiked, newCount);
      } else {
        // optimistic like
        setLiked(true);
        setLikeCount(prevCount + 1);
        const res = await api.post(`/tweets/${tweet._id}/like`);
        const newLiked = res.data.liked as boolean;
        const newCount = res.data.likeCount as number;
        setLiked(newLiked);
        setLikeCount(newCount);
        onLikeChange?.(tweet._id, newLiked, newCount);
      }
    } catch (err) {
      // rollback on error
      setLiked(prevLiked);
      setLikeCount(prevCount);
    } finally {
      setLikeLoading(false);
    }
  };

  return (
    <div className="border-b border-gray-800 p-4 hover:bg-gray-900 transition-colors cursor-pointer">
      <div className="flex space-x-4">
        {/* Avatar - Clickable with first letter fallback */}
        <div className="flex-shrink-0">
          <button
            onClick={handleProfileClick}
            className="hover:opacity-80 transition-opacity"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-indigo-400 p-0.5">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                {tweet.author.avatar && tweet.author.avatar !== "default_avatar_url" ? (
                  <img
                    src={tweet.author.avatar}
                    alt=""
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // If image fails to load, hide it and show fallback
                      e.currentTarget.style.display = 'none';
                      const fallbackDiv = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallbackDiv) {
                        fallbackDiv.classList.remove('hidden');
                      }
                    }}
                  />
                ) : null}
                {/* Fallback letter display */}
                <div className={`w-full h-full flex items-center justify-center ${
                  tweet.author.avatar && tweet.author.avatar !== "default_avatar_url" ? 'hidden' : ''
                }`}>
                  <span className="text-white font-semibold text-lg">
                    {getUserInitial()}
                  </span>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Tweet Content */}
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            {/* Clickable Display Name */}
            <button
              onClick={handleProfileClick}
              className="font-bold text-white hover:underline transition-all"
            >
              {tweet.author.displayName}
            </button>
            {/* Clickable Username */}
            <button
              onClick={handleProfileClick}
              className="text-gray-500 hover:text-gray-300 hover:underline transition-all"
            >
              @{tweet.author.username}
            </button>
            <span className="text-gray-500">
              · {new Date(tweet.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="mt-1 text-gray-200">{tweet.text}</p>

          {/* Actions */}
          <div className="flex justify-between mt-3 text-gray-500 max-w-md">
            <button className="flex items-center space-x-2 hover:text-purple-500 transition-colors">
              <MessageCircle size={18} />
              <span>0</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-green-500 transition-colors">
              <Repeat2 size={18} />
              <span>0</span>
            </button>
            <button
              onClick={handleToggleLike}
              disabled={likeLoading}
              className={`flex items-center space-x-2 transition-colors ${liked ? 'text-red-500' : 'hover:text-red-500'}`}
            >
              <Heart size={18} className={liked ? 'fill-red-500 text-red-500' : ''} />
              <span>{likeCount}</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
              <Share size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
