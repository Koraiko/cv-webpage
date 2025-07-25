import 'react-vertical-timeline-component/style.min.css';
import { JSX } from 'react/jsx-runtime';
import "./Footer.css";
import { useEffect, useState, useCallback, useMemo } from 'react';
import { FooterItem } from './Footer';
import ProgressBarBasic from './ProgressBarBasic';
import { useScrollMetrics } from '../shared/hooks/useScrollMetrics';
import { SectionWaypoint, createWaypoints, isValidWaypoint } from '../shared/utils/waypoints';
import { SectionDetector } from '../shared/utils/sectionDetector';
import { ProgressCalculator } from '../shared/utils/progressCalculator';

/**
 * Smart progress bar component that tracks scroll progress through page sections.
 * 
 * Aligns with footer navigation using CSS `justify-content-around` spacing:
 * - For 5 items: positions at 10%, 30%, 50%, 70%, 90% of the progress bar width
 * - Smooth transitions between sections with optimized small section detection
 * 
 * @param items - Array of footer navigation items corresponding to page sections
 */
const ProgressBar = ({ items }: { items: FooterItem[] }): JSX.Element => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [waypoints, setWaypoints] = useState<SectionWaypoint[]>([]);
    
    const getScrollMetrics = useScrollMetrics();
    
    // Memoize detector and calculator to prevent recreation on every render
    const sectionDetector = useMemo(() => new SectionDetector(waypoints), [waypoints]);
    const progressCalculator = useMemo(() => new ProgressCalculator(waypoints), [waypoints]);

    /**
     * Calculates waypoints for all navigation sections
     */
    const calculateWaypoints = useCallback((): void => {
        const { maxScrollTop } = getScrollMetrics();
        const newWaypoints = createWaypoints(items, maxScrollTop);
        setWaypoints(newWaypoints);
    }, [items, getScrollMetrics]);

    /**
     * Handles scroll events and updates progress
     */
    const handleScroll = useCallback((): void => {
        if (waypoints.length === 0) return;

        const { scrollTop, scrollProgress: currentScrollProgress } = getScrollMetrics();
        
        const validWaypoints = waypoints.filter(isValidWaypoint);
        if (validWaypoints.length === 0) {
            setScrollProgress(0);
            return;
        }

        const currentSection = sectionDetector.findCurrentSection(scrollTop, currentScrollProgress);
        const progress = progressCalculator.calculateProgress(currentSection, scrollTop);
        
        setScrollProgress(Math.min(Math.max(progress, 0), 100));
    }, [waypoints, getScrollMetrics, sectionDetector, progressCalculator]);

    // Throttled scroll event listener
    useEffect(() => {
        let ticking = false;

        const throttledScrollHandler = (): void => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', throttledScrollHandler, { passive: true });
        handleScroll(); // Initial calculation
        
        return () => window.removeEventListener('scroll', throttledScrollHandler);
    }, [handleScroll]);

    // Initialize waypoints and handle resize
    useEffect(() => {
        const handleResize = (): void => calculateWaypoints();

        const timer = setTimeout(calculateWaypoints, 1000); // Ensure DOM is loaded
        window.addEventListener('resize', handleResize);
        
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', handleResize);
        };
    }, [calculateWaypoints]);

    return (
        <ProgressBarBasic 
            progress={scrollProgress} 
            classNameBackground='border-ash-gray bg-ash-gray' 
            classNameProgress='border-rich-black bg-rich-black' 
        />
    );
};

export default ProgressBar;
