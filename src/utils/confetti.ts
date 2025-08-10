// Import confetti with proper error handling
let confetti: any = null;

// Dynamically import confetti to handle potential loading issues
const loadConfetti = async () => {
  if (confetti) return confetti;
  
  try {
    const confettiModule = await import('canvas-confetti');
    confetti = confettiModule.default || confettiModule;
    console.log('✅ Confetti library loaded successfully');
    
    // Make functions available globally immediately after loading
    if (typeof window !== 'undefined') {
      (window as any).testConfetti = testConfetti;
      (window as any).triggerFirecrackerConfetti = triggerFirecrackerConfetti;
      (window as any).triggerCelebrationBurst = triggerCelebrationBurst;
      (window as any).triggerSuccessSparkle = triggerSuccessSparkle;
      (window as any).triggerProjectCompletionCelebration = triggerProjectCompletionCelebration;
      console.log('🌐 Confetti functions exposed globally');
    }
    
    return confetti;
  } catch (error) {
    console.error('❌ Failed to load confetti library:', error);
    return null;
  }
};

// Test function to verify confetti is working
export const testConfetti = async () => {
  console.log('🎊 Testing confetti...');
  const confettiLib = await loadConfetti();
  if (!confettiLib) {
    console.error('Confetti library not available');
    return;
  }
  
  confettiLib({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
};

// Firecracker explosion effect
export const triggerFirecrackerConfetti = async () => {
  console.log('🎆 Triggering firecracker confetti!');
  
  const confettiLib = await loadConfetti();
  if (!confettiLib) {
    console.error('Confetti library not available');
    return;
  }
  
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  const defaults = { 
    startVelocity: 30, 
    spread: 360, 
    ticks: 60, 
    zIndex: 9999,
    colors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']
  };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  // Initial big burst
  confettiLib({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
    zIndex: 9999
  });

  const interval: NodeJS.Timeout = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    
    // Since particles fall down, start a bit higher than random
    confettiLib({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
    });
    confettiLib({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
    });
  }, 250);
};

// Celebration burst effect
export const triggerCelebrationBurst = async () => {
  console.log('🎉 Triggering celebration burst!');
  
  const confettiLib = await loadConfetti();
  if (!confettiLib) {
    console.error('Confetti library not available');
    return;
  }
  
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999
  };

  function fire(particleRatio: number, opts: any) {
    confettiLib({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']
  });

  fire(0.2, {
    spread: 60,
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1']
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#FFD700', '#96CEB4', '#FFEAA7']
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFD700']
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#96CEB4', '#FFEAA7', '#FFD700']
  });
};

// Success sparkle effect
export const triggerSuccessSparkle = async () => {
  console.log('✨ Triggering success sparkle!');
  
  const confettiLib = await loadConfetti();
  if (!confettiLib) {
    console.error('Confetti library not available');
    return;
  }
  
  const end = Date.now() + (2 * 1000);
  const colors = ['#FFD700', '#FFA500', '#FF6B6B', '#4ECDC4', '#45B7D1'];

  (function frame() {
    confettiLib({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
      zIndex: 9999
    });
    confettiLib({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
      zIndex: 9999
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
};

// Project completion mega celebration
export const triggerProjectCompletionCelebration = async () => {
  console.log('🏆 Triggering project completion celebration!');
  
  const confettiLib = await loadConfetti();
  if (!confettiLib) {
    console.error('Confetti library not available');
    return;
  }
  
  const duration = 5000;
  const animationEnd = Date.now() + duration;
  const defaults = { 
    startVelocity: 30, 
    spread: 360, 
    ticks: 60, 
    zIndex: 9999 
  };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  // Initial massive burst
  confettiLib({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98FB98'],
    zIndex: 9999
  });

  // Continuous smaller bursts
  const interval: NodeJS.Timeout = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    
    confettiLib({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1']
    });
    confettiLib({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#96CEB4', '#FFEAA7', '#DDA0DD', '#98FB98']
    });
  }, 250);

  // Side cannons
  setTimeout(() => {
    confettiLib({
      particleCount: 100,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#FFD700', '#FFA500', '#FF6B6B'],
      zIndex: 9999
    });
    confettiLib({
      particleCount: 100,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#4ECDC4', '#45B7D1', '#96CEB4'],
      zIndex: 9999
    });
  }, 1000);

  // Final burst
  setTimeout(() => {
    confettiLib({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98FB98'],
      zIndex: 9999
    });
  }, 2500);
};

// Preload confetti library on module load and expose functions
if (typeof window !== 'undefined') {
  // Immediately expose placeholder functions
  (window as any).testConfetti = () => {
    console.log('Loading confetti...');
    testConfetti();
  };
  (window as any).triggerFirecrackerConfetti = () => triggerFirecrackerConfetti();
  (window as any).triggerCelebrationBurst = () => triggerCelebrationBurst();
  (window as any).triggerSuccessSparkle = () => triggerSuccessSparkle();
  (window as any).triggerProjectCompletionCelebration = () => triggerProjectCompletionCelebration();
  
  // Preload the library
  loadConfetti().catch(error => {
    console.warn('Could not preload confetti library:', error);
  });
}