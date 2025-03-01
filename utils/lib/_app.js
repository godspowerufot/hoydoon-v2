'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animationPresets, scrollTriggerConfig } from '././animate';
import { usePathname } from 'next/navigation';
// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function AnimationWrapper({ children }) {
  const pathname = usePathname(); // ✅ Detect route changes

  useEffect(() => {
    let mm = gsap.matchMedia();
  
    mm.add("(min-width: 1024px)", () => {
      console.log("Desktop Animation Running..."); // Debugging
  
      gsap.utils.toArray("[data-animate]").forEach((element) => {
        console.log("Animating Element (LG):", element); // Debugging
  
        const animationType = element.dataset.animate || "fade-up";
        const preset = animationPresets[animationType];
  
        if (preset) {
          gsap.from(element, {
            ...preset.props,
            duration: parseFloat(element.dataset.duration) || preset.config.duration,
            ease: preset.config.ease,
            autoAlpha: 0,
            scrollTrigger: {
              trigger: element,
              ...scrollTriggerConfig,
            },
          });
        }
      });
    });
  
    mm.add("(max-width: 1023px)", () => {
      console.log("Mobile Animation Running..."); // Debugging
  
      gsap.utils.toArray("[data-mobile]").forEach((element) => {
        console.log("Animating Element (Mobile):", element); // Debugging
  
        const animationType = element.dataset.mobile || "zoom-in";
        const preset = animationPresets[animationType];
  
        if (preset) {
          gsap.from(element, {
            ...preset.props,
            duration: parseFloat(element.dataset.duration) || preset.config.duration,
            ease: preset.config.ease,
            autoAlpha: 0,
            scrollTrigger: {
              trigger: element,
              ...scrollTriggerConfig,
            },
          });
        }
      });
    });
  
 
    // Cleanup function
    return () => {
      // Don't kill animations entirely, just remove unnecessary triggers
      mm.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [pathname]); // ✅ Runs on route change

  

  return <>{children}</>;
}