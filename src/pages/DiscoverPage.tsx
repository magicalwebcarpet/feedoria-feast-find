
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DiscoverCard from '@/components/shared/DiscoverCard';
import { ArrowLeft, ChevronUp, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { discovers } from '@/lib/data';

const DiscoverPage = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  
  const handleNext = () => {
    setDirection(1);
    setCurrentIndex(prev => (prev + 1) % discovers.length);
  };
  
  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex(prev => (prev - 1 + discovers.length) % discovers.length);
  };
  
  const currentDiscover = discovers[currentIndex];

  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      y: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      y: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  // Support for swipe gestures - now vertical
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className="h-screen bg-black overflow-hidden">
      {/* Back button to return to delivery tab */}
      <button 
        onClick={() => navigate('/')} 
        className="absolute top-4 left-4 z-20 bg-black/30 rounded-full p-2"
      >
        <ArrowLeft className="w-6 h-6 text-white" />
      </button>

      <motion.div
        className="h-full w-full"
        key={currentIndex}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          y: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 }
        }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={1}
        onDragEnd={(e, { offset, velocity }) => {
          const swipe = swipePower(offset.y, velocity.y);

          if (swipe < -swipeConfidenceThreshold) {
            // Swiped up
            handleNext();
          } else if (swipe > swipeConfidenceThreshold) {
            // Swiped down
            handlePrev();
          }
        }}
      >
        <DiscoverCard
          id={currentDiscover.id}
          username={currentDiscover.username}
          userAvatar={currentDiscover.userAvatar}
          content={currentDiscover.content}
          likes={currentDiscover.likes}
          comments={currentDiscover.comments}
          description={currentDiscover.description}
        />
      </motion.div>
      
      {discovers.length > 1 && (
        <>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev} 
            className="absolute top-1/2 left-2 z-10 bg-black/30 rounded-full p-1 transform -translate-y-12"
          >
            <ChevronUp className="w-6 h-6 text-white" />
          </motion.button>
          
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={handleNext} 
            className="absolute top-1/2 right-2 z-10 bg-black/30 rounded-full p-1 transform translate-y-12"
          >
            <ChevronDown className="w-6 h-6 text-white" />
          </motion.button>
        </>
      )}
      
      <div className="absolute top-4 left-0 right-0 z-10 flex justify-center">
        <div className="bg-black/30 rounded-full px-4 py-1 flex items-center space-x-1">
          {discovers.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-2 w-2 rounded-full ${idx === currentIndex ? 'bg-feedoria-red' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscoverPage;
