import { FooterItem } from '../../Layout/Footer';

export interface SectionWaypoint {
    id: string;
    progressWidth: number;
}

/**
 * Creates waypoints for navigation sections based on DOM element positions
 */
export const createWaypoints = (items: FooterItem[], maxScrollTop: number): SectionWaypoint[] => {
    return items.map((item) => {
        const element = document.getElementById(item.linkToId);
        
        if (!element) {
            return { id: item.linkToId, progressWidth: -1 }; // Non-existent element
        }
        
        // Calculate scroll position when element becomes visible (with header offset)
        const elementTop = element.offsetTop - 100;
        const progressWidth = maxScrollTop > 0 ? (elementTop / maxScrollTop) * 100 : 0;
        
        return {
            id: item.linkToId,
            progressWidth: Math.min(Math.max(progressWidth, 0), 100)
        };
    });
};

/**
 * Checks if a waypoint represents a valid DOM element
 */
export const isValidWaypoint = (waypoint: SectionWaypoint): boolean => {
    return waypoint.progressWidth >= 0;
};
