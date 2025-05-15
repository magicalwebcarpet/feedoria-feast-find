
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share } from 'lucide-react';

interface DiscoverCardProps {
  id: string;
  username: string;
  userAvatar: string;
  content: string;
  likes: number;
  comments: number;
  description: string;
}

const DiscoverCard = ({ 
  username, 
  userAvatar, 
  content, 
  likes, 
  comments,
  description 
}: DiscoverCardProps) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="relative h-[calc(100vh-64px)] w-full bg-black">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={content}
        autoPlay
        loop
        muted
        playsInline
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
      
      {/* Interaction buttons */}
      <div className="absolute bottom-20 right-4 flex flex-col items-center gap-6">
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={handleLike}
          className="flex flex-col items-center"
        >
          <div className="bg-black/30 p-2 rounded-full">
            <Heart className={`w-7 h-7 ${liked ? 'fill-feedoria-red stroke-feedoria-red' : 'text-white'}`} />
          </div>
          <span className="text-white text-xs mt-1">{likeCount}</span>
        </motion.button>
        
        <motion.button whileTap={{ scale: 0.9 }} className="flex flex-col items-center">
          <div className="bg-black/30 p-2 rounded-full">
            <MessageCircle className="w-7 h-7 text-white" />
          </div>
          <span className="text-white text-xs mt-1">{comments}</span>
        </motion.button>
        
        <motion.button whileTap={{ scale: 0.9 }} className="flex flex-col items-center">
          <div className="bg-black/30 p-2 rounded-full">
            <Share className="w-7 h-7 text-white" />
          </div>
          <span className="text-white text-xs mt-1">Share</span>
        </motion.button>
      </div>
      
      {/* User info and description */}
      <div className="absolute bottom-4 left-4 right-16">
        <div className="flex items-center mb-2">
          <img 
            src={userAvatar} 
            alt={username} 
            className="w-10 h-10 rounded-full border-2 border-white object-cover"
          />
          <span className="ml-2 text-white font-medium">@{username}</span>
        </div>
        <p className="text-white text-sm line-clamp-2">{description}</p>
      </div>
      
      {/* Discover Banner */}
      <div className="absolute top-4 left-4">
        <div className="bg-gradient-to-r from-feedoria-purple to-feedoria-red px-3 py-1 rounded-full">
          <span className="text-white font-bold text-sm">Discover</span>
        </div>
      </div>
    </div>
  );
};

export default DiscoverCard;
