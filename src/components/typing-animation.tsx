'use client';

import React from 'react';

interface TypingAnimationProps {
  text: string;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({ text }) => {
  // We use a CSS variable to pass the character count to the CSS animation
  const style = { '--character-count': text.length } as React.CSSProperties;

  return (
    <div className="typing-container">
      <h1 className="typing-text font-logo text-3d text-4xl" style={style}>
        {text}
      </h1>
    </div>
  );
};

export default TypingAnimation;
