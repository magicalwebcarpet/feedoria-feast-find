
import React, { useState } from 'react';
import DroolCard from '@/components/shared/DroolCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { drools } from '@/lib/data';

const DiscoverPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  
  const handleNext = () => {
    setDirection(1);
    setCurrentIndex(prev => (prev + 1) % drools.length);
  };
  
  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex(prev => (prev - 1 + drools.length) % drools.length);
  };
  
  const currentDrool = drools[currentIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  // Support for swipe gestures
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className="h-screen bg-black overflow-hidden">
      <motion.div
        className="h-full w-full"
        key={currentIndex}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 }
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={1}
        onDragEnd={(e, { offset, velocity }) => {
          const swipe = swipePower(offset.x, velocity.x);

          if (swipe < -swipeConfidenceThreshold) {
            handleNext();
          } else if (swipe > swipeConfidenceThreshold) {
            handlePrev();
          }
        }}
      >
        <DroolCard
          id={currentDrool.id}
          username={currentDrool.username}
          userAvatar={currentDrool.userAvatar}
          content={currentDrool.content}
          likes={currentDrool.likes}
          comments={currentDrool.comments}
          description={currentDrool.description}
        />
      </motion.div>
      
      {drools.length > 1 && (
        <>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev} 
            className="absolute top-1/2 left-2 z-10 bg-black/30 rounded-full p-1"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </motion.button>
          
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={handleNext} 
            className="absolute top-1/2 right-2 z-10 bg-black/30 rounded-full p-1"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </motion.button>
        </>
      )}
      
      <div className="absolute top-4 left-0 right-0 z-10 flex justify-center">
        <div className="bg-black/30 rounded-full px-4 py-1 flex items-center space-x-1">
          {drools.map((_, idx) => (
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
