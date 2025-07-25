import { SectionWaypoint, isValidWaypoint } from './waypoints';

export interface CurrentSection {
    currentSection: SectionWaypoint | null;
    currentSectionIndex: number;
}

/**
 * Finds the currently active section based on scroll position
 * Uses aggressive detection optimized for small sections
 */
export class SectionDetector {
    constructor(private waypoints: SectionWaypoint[]) {}

    /**
     * Gets the last valid section (for end of page scenarios)
     */
    private getLastValidSection(): CurrentSection {
        for (let i = this.waypoints.length - 1; i >= 0; i--) {
            if (isValidWaypoint(this.waypoints[i])) {
                return { currentSection: this.waypoints[i], currentSectionIndex: i };
            }
        }
        return { currentSection: null, currentSectionIndex: -1 };
    }

    /**
     * Finds the last section that the user has scrolled past
     */
    private findLastPassedSection(scrollTop: number): CurrentSection {
        let currentSection = null;
        let currentSectionIndex = -1;
        
        for (let i = 0; i < this.waypoints.length; i++) {
            const waypoint = this.waypoints[i];
            if (!isValidWaypoint(waypoint)) continue;
            
            const element = document.getElementById(waypoint.id);
            if (!element) continue;
            
            if (scrollTop >= element.offsetTop - 100) {
                currentSection = waypoint;
                currentSectionIndex = i;
            }
        }
        
        return currentSection ? { currentSection, currentSectionIndex } : this.getLastValidSection();
    }

    /**
     * Main section detection logic with small section optimization
     */
    findCurrentSection(scrollTop: number, scrollProgress: number): CurrentSection {
        // Force last section when near bottom of page
        if (scrollProgress >= 95) {
            return this.getLastValidSection();
        }
        
        let bestMatch: CurrentSection = { currentSection: null, currentSectionIndex: -1 };
        let smallestDistance = Infinity;
        
        for (let i = 0; i < this.waypoints.length; i++) {
            const waypoint = this.waypoints[i];
            if (!isValidWaypoint(waypoint)) continue;
            
            const element = document.getElementById(waypoint.id);
            if (!element) continue;
            
            const elementTop = element.offsetTop - 100;
            const elementHeight = element.offsetHeight;
            const elementBottom = elementTop + elementHeight;
            
            // Small section detection and buffer calculation
            const isSmallSection = elementHeight < 300;
            const bufferSize = isSmallSection 
                ? Math.max(elementHeight, 200)  // Large buffer for small sections
                : Math.min(elementHeight * 0.3, 150); // Standard buffer for normal sections
            
            const extendedTop = elementTop - bufferSize;
            const extendedBottom = elementBottom + bufferSize;
            
            // Check if within extended detection area
            if (scrollTop >= extendedTop && scrollTop <= extendedBottom) {
                let distance = this.calculateDistance(scrollTop, elementTop, elementBottom, isSmallSection);
                
                if (distance < smallestDistance) {
                    smallestDistance = distance;
                    bestMatch = { currentSection: waypoint, currentSectionIndex: i };
                }
            }
        }
        
        return bestMatch.currentSection ? bestMatch : this.findLastPassedSection(scrollTop);
    }

    /**
     * Calculates distance for section priority
     */
    private calculateDistance(scrollTop: number, elementTop: number, elementBottom: number, isSmallSection: boolean): number {
        if (isSmallSection) {
            let distance: number;
            
            if (scrollTop >= elementTop && scrollTop <= elementBottom) {
                distance = 0; // Inside section - highest priority
            } else if (scrollTop < elementTop) {
                distance = elementTop - scrollTop; // Above section
            } else {
                distance = scrollTop - elementBottom; // Below section
            }
            
            return distance * 0.5; // Give small sections priority
        } else {
            // For normal sections: distance to center
            const sectionCenter = elementTop + (elementTop + elementBottom) / 2;
            return Math.abs(scrollTop - sectionCenter);
        }
    }
}
