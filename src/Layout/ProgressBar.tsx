import 'react-vertical-timeline-component/style.min.css';
import { JSX } from 'react/jsx-runtime';
import "./Footer.css";
import { useEffect, useState } from 'react';
import { FooterItem } from './Footer';
import ProgressBarBasic from './ProgressBarBasic';

interface ProgressBarProps {
    items: FooterItem[];    // Array of footer navigation items corresponding to page sections
    currentPageIndex: number;    // Current active page index from the main app
    pages: React.ReactElement[];  // Array of all page components to match against footer items
}

/*
 * CoPilot help with positioning:
 * Aligns with footer navigation using CSS `justify-content-around` spacing:
 * - For 5 items: positions at 10%, 30%, 50%, 70%, 90% of the progress bar width
 * - Shows progress based on current page index, but only for pages that have footer items
 */

/**
 * Smart progress bar component that tracks progress through page sections.
 *
 * @param items - Array of footer navigation items corresponding to page sections
 * @param currentPageIndex - Current active page index from the main app
 * @param pages - Array of all page components to match against footer items
 */
const ProgressBar = ({ items, currentPageIndex, pages }: ProgressBarProps): JSX.Element => {
    const [progress, setProgress] = useState(0);

    // Calculate progress based on current page index
    useEffect(() => {
        if (items.length === 0) {
            setProgress(0);
            return;
        }

        // Find which footer item corresponds to the current page => if current page does not exist in footer dont update progress
        const currentPage = pages[currentPageIndex];
        if (!currentPage) {
            setProgress(prevProgress => prevProgress);
            return;
        }

        const componentName = typeof currentPage.type === 'string' ? currentPage.type : currentPage.type.name;
        const footerItemIndex = items.findIndex(item => item.linkToId === componentName);

        // current page has no footer item => dont update progress
        if (footerItemIndex === -1) {
            setProgress(prevProgress => prevProgress);
            return;
        }

        // Calculate progress to align with footer items using justify-content-around spacing
        const itemCount = items.length;
        let calculatedProgress: number;
        
        if (itemCount === 1) {
            calculatedProgress = 50;
        } else {
            // justify-content-around: space/2 + index * space
            const space = 100 / itemCount;
            calculatedProgress = (space / 2) + (footerItemIndex * space);
        }
        
        setProgress(Math.min(Math.max(calculatedProgress, 0), 100));
    }, [currentPageIndex, items.length, items, pages]);

    return (
        <ProgressBarBasic 
            progress={progress} 
            classNameBackground='border-ash-gray bg-ash-gray' 
            classNameProgress='border-rich-black bg-rich-black' 
        />
    );
};

export default ProgressBar;
