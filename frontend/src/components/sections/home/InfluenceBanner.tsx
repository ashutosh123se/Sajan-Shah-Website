'use client';

import React, { useState, useEffect } from 'react';

export const InfluenceBanner: React.FC = () => {
  const words = ['Experience.', 'Movement.', 'Journey.'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const handleTyping = () => {
      const fullWord = words[currentWordIndex];
      
      if (isDeleting) {
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        setTypingSpeed(50); // Faster when deleting
      } else {
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        setTypingSpeed(150); // Normal typing speed
      }

      if (!isDeleting && currentText === fullWord) {
        // Pause at the end of the word before deleting
        timer = setTimeout(() => setIsDeleting(true), 2000);
        return;
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        // Pause before typing next word
        timer = setTimeout(() => {}, 500);
        return;
      }

      timer = setTimeout(handleTyping, typingSpeed);
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, typingSpeed, words]);

  return (
    <div className="relative z-20 -mt-16 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-brand-orange text-white py-10 md:py-14 px-6 md:px-12 shadow-2xl border-4 border-transparent flex justify-center items-center text-center">
        <h2 className="text-3xl md:text-5xl lg:text-5xl font-body font-light tracking-tight">
          This Is Not an Event. It’s a Transformation <span className="font-semibold inline-block min-w-[180px] md:min-w-[280px] text-left">{currentText}<span className="animate-pulse">|</span></span>
        </h2>
      </div>
    </div>
  );
};
