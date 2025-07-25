import { useCallback } from 'react';

export interface ScrollMetrics {
    scrollTop: number;
    windowHeight: number;
    documentHeight: number;
    maxScrollTop: number;
    scrollProgress: number;
}

/**
 * Hook for getting current scroll position and page dimensions
 */
export const useScrollMetrics = () => {
    return useCallback((): ScrollMetrics => {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const maxScrollTop = documentHeight - windowHeight;
        
        return {
            scrollTop,
            windowHeight,
            documentHeight,
            maxScrollTop,
            scrollProgress: maxScrollTop > 0 ? (scrollTop / maxScrollTop) * 100 : 0
        };
    }, []);
};
