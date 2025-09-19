'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef, type ReactNode } from 'react';

const ANIMATION_TIME = 400;

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const [label, setLabel] = useState('Loading...');
  
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current === pathname) {
      return;
    }
    
    setIsAnimating(true);
    setAnimationClass('overlay__scene--in');

    const newLabel = pathname.substring(1) || 'Home';
    setLabel(newLabel.charAt(0).toUpperCase() + newLabel.slice(1));
    
    // IN animation
    const inTimer = setTimeout(() => {
      
      // Random loading time after the overlay rolls in
      const randomDelay = Math.random() * 400 + 400;
      const loadingTimer = setTimeout(() => {
        setAnimationClass('overlay__scene--out');
        previousPathname.current = pathname;
      }, randomDelay);
      
      return () => clearTimeout(loadingTimer);

    }, ANIMATION_TIME);
    
    // OUT animation
    const outTimer = setTimeout(() => {
        setIsAnimating(false);
    }, ANIMATION_TIME * 2 + 800)


    return () => {
      clearTimeout(inTimer);
      clearTimeout(outTimer);
    };
  }, [pathname]);

  return (
    <div className="page-wrapper">
      {isAnimating && (
         <div className="overlay">
            <div className={`overlay__scene ${animationClass}`}>
                <div className="overlay__label">
                    <div className="overlay__label-content">{label}</div>
                </div>
                {/* Replicating the SCSS loop for ribbons */}
                {[...Array(16)].map((_, i) => (
                    <div key={i} className={`overlay__ribbon ribbon--${i + 1}`}></div>
                ))}
            </div>
        </div>
      )}
      {children}
    </div>
  );
}
