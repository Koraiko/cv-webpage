import AboutMe from './Chapters/AboutMe/AboutMe.tsx';
import CvOverview from './Chapters/Cv/CvOverview';
import CvTimeline from './Chapters/Cv/CvTimeline';
import ContactMe from './Chapters/ContactMe/ContactMe';
import Inspiration from './Chapters/Inspiration';
import Intro from './Chapters/Intro';
import Footer from './Layout/Footer';
import { useEffect, useState, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";


gsap.registerPlugin(Observer);

/**
 * Animation configuration constants
 */
const ANIMATION_CONFIG = {
  duration: 0.6,
  ease: "power2.inOut",
  overlap: 0.3,
  scrollTolerance: 5
};

/**
 * Layout style constants
 */
const STYLES = {
  container: {
    height: '100vh',
    overflow: 'hidden',
    position: 'relative'
  },
  page: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: 'calc(100vh - 100px)', // Account for footer height
    overflowY: 'auto',
    padding: 0,
    margin: 0
  }
};

/**
 * Main App component that handles page-based navigation with GSAP animations
 * Features smooth transitions between pages and intelligent scroll handling
 */
function App() {
  // State management
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Refs for DOM manipulation
  const pagesRef = useRef([]);
  const observerRef = useRef(null);

  // Page components configuration
  const pages = [<Intro />, <AboutMe />, <CvOverview />, <CvTimeline />, <ContactMe />, <Inspiration />];

  /**
   * Sets the scroll position of a page based on navigation direction
   * @param {HTMLElement} pageElement - The page element to scroll
   * @param {boolean} isScrollingDown - Whether scrolling down (true) or up (false)
   */
  const setPageScrollPosition = useCallback((pageElement, isScrollingDown) => {
    if (!pageElement) return;

    if (isScrollingDown) {
      // Always scroll to top when going forward
      pageElement.scrollTop = 0;
    } else {
      // When going backward, only scroll to bottom if content is actually scrollable
      const maxScroll = pageElement.scrollHeight - pageElement.clientHeight;
      if (maxScroll > 0) {
        pageElement.scrollTop = maxScroll;
      } else {
        // If content doesn't scroll, stay at top to show titles
        pageElement.scrollTop = 0;
      }
    }
  }, []);

  /**
   * Checks if a page element has scrollable content
   * @param {HTMLElement} pageElement - The page element to check
   * @returns {boolean} True if the page is scrollable
   */
  const isPageScrollable = useCallback((pageElement) => {
    return pageElement && pageElement.scrollHeight > pageElement.clientHeight;
  }, []);

  /**
   * Checks if we can navigate away from current page in given direction
   * @param {HTMLElement} pageElement - Current page element
   * @param {'up'|'down'} direction - Navigation direction
   * @returns {boolean} True if navigation is allowed
   */
  const canNavigateFromPage = useCallback((pageElement, direction) => {
    if (!isPageScrollable(pageElement)) return true;

    const scrollTop = pageElement.scrollTop;
    const maxScroll = pageElement.scrollHeight - pageElement.clientHeight;

    return direction === 'down' 
      ? scrollTop >= maxScroll - ANIMATION_CONFIG.scrollTolerance
      : scrollTop <= ANIMATION_CONFIG.scrollTolerance;
  }, [isPageScrollable]);

  /**
   * Navigates to a specific page with smooth GSAP animation
   * @param {number} newIndex - Target page index
   */
  const navigateToPage = useCallback((newIndex) => {
    // Boundary and state validation
    if (newIndex === currentPageIndex || isAnimating || newIndex < 0 || newIndex >= pages.length) {
      return;
    }
    
    setIsAnimating(true);
    const currentPage = pagesRef.current[currentPageIndex];
    const nextPage = pagesRef.current[newIndex];
    const isScrollingDown = newIndex > currentPageIndex;

    // Create animation timeline
    const timeline = gsap.timeline({
      onComplete: () => {
        setCurrentPageIndex(newIndex);
        setIsAnimating(false);
        // Ensure page is properly positioned after animation
        if (nextPage) {
          gsap.set(nextPage, { 
            y: 0, 
            opacity: 1,
            clearProps: "transform"
          });
          // Set scroll position after ensuring page is positioned
          requestAnimationFrame(() => {
            setPageScrollPosition(nextPage, isScrollingDown);
          });
        }
      }
    });

    // Animate current page exit
    if (currentPage) {
      timeline.to(currentPage, {
        y: isScrollingDown ? "-100%" : "100%",
        opacity: 0,
        duration: ANIMATION_CONFIG.duration,
        ease: ANIMATION_CONFIG.ease
      });
    }

    // Animate next page entrance
    if (nextPage) {
      timeline.fromTo(nextPage, 
        {
          y: isScrollingDown ? "100%" : "-100%",
          opacity: 0
        },
        {
          y: "0%",
          opacity: 1,
          duration: ANIMATION_CONFIG.duration,
          ease: ANIMATION_CONFIG.ease
        },
        `-=${ANIMATION_CONFIG.overlap}`
      );
    }
  }, [currentPageIndex, isAnimating, pages.length, setPageScrollPosition]);

  /**
   * Handles scroll navigation with intelligent content-aware logic
   * @param {'up'|'down'} direction - Scroll direction
   */
  const handleScrollNavigation = useCallback((direction) => {
    const currentPageElement = pagesRef.current[currentPageIndex];
    if (!currentPageElement) return;

    // Check if we can navigate away from current page
    if (canNavigateFromPage(currentPageElement, direction)) {
      const targetIndex = direction === 'down' ? currentPageIndex + 1 : currentPageIndex - 1;
      navigateToPage(targetIndex);
    }
  }, [currentPageIndex, canNavigateFromPage, navigateToPage]);

  /**
   * Initialize page positions on component mount
   */
  useEffect(() => {
    pagesRef.current.forEach((page, index) => {
      if (page) {
        if (index === 0) {
          gsap.set(page, {
            y: 0,
            opacity: 1,
            clearProps: "transform"
          });
          page.scrollTop = 0;
        } else {
          gsap.set(page, {
            y: "100%",
            opacity: 0
          });
        }
      }
    });
  }, []);

  /**
   * observer cleanup
   */
  function cleanupObserver(currentObserver) {
    if (currentObserver) currentObserver.kill();
  }

  /**
   * Setup scroll observer for handling wheel and touch events
   */
  useEffect(() => {
    // Cleanup previous observer
    cleanupObserver(observerRef.current);

    // Create new observer for scroll handling
    observerRef.current = Observer.create({
      target: window,
      type: "wheel,touch",
      onDown: () => handleScrollNavigation('down'),
      onUp: () => handleScrollNavigation('up'),
      tolerance: 10,
      preventDefault: false
    });

    // Cleanup on unmount or dependency change
    return () => {
      cleanupObserver(observerRef.current);
    };
  }, [handleScrollNavigation]);

  return (
    <>
      <div style={STYLES.container}>
        {pages.map((page, index) => (
          <div 
            className="scroll-box w-100" 
            key={index} 
            id={page.type.name}
            ref={el => pagesRef.current[index] = el}
            style={STYLES.page}
          >
              {page}
          </div>
        ))}
      </div>
      <Footer 
        onNavigate={navigateToPage} 
        pages={pages} 
        currentPageIndex={currentPageIndex} 
      />
    </>
  );
}

export default App;
