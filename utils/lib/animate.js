export const animationPresets = {
    // Existing presets...
    'fade-up': {
      props: { y: 50, opacity: 0 },
      config: { duration: 0.9, ease: 'power3.out' }
    },
    'fade-down': {
      props: { y: -50, opacity: 0 },
      config: { duration: 0.8, ease: 'power3.inOut' }
    },
    'fade-left': {
      props: { x: 50, opacity: 0 },
      config: { duration: 0.8, ease: 'back.out(1.7)' }
    },
    'fade-right': {
      props: { x: -50, opacity: 0 },
      config: { duration: 0.9, ease: 'expo.out' }
    },
    'fade-in': {
      props: { opacity: 0, y: 0 },
      config: { duration: 0.6, ease: 'power3.out' }
    },
    'zoom-in': {
      props: { scale: 0.5, opacity: 0 },
      config: { duration: 0.8, ease: 'power3.out' }
    },
    'zoom-out': {
      props: { scale: 1.5, opacity: 0 },
      config: { duration: 0.8, ease: 'power3.out' }
    },
  
    // New slide-in animations
    'slide-in-left': {
      props: { x: '-100%', opacity: 0 }, // Start off-screen to the left
      config: { duration: 1, ease: 'power3.out' }
    },
    'slide-in-right': {
      props: { x: '100%', opacity: 0 }, // Start off-screen to the right
      config: { duration: 1, ease: 'power3.out' }
    }
  };
  export const scrollTriggerConfig = {
    start: "top 85%",
    toggleActions: "play none none noneS",
    markers: false
  };