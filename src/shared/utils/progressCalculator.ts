import { SectionWaypoint } from './waypoints';
import { CurrentSection } from './sectionDetector';

// TODO: Copilot helped with calculateProgress bug => maybe refactor this after understanding the logic/ math
/**
 * Calculates progress using justify-content-around positioning
 * Formula: ((2 * index + 1) / (2 * totalItems)) * 100
 */
export class ProgressCalculator {
    constructor(private waypoints: SectionWaypoint[]) {}

    /**
     * Main progress calculation
     */
    calculateProgress(currentSection: CurrentSection, scrollTop: number): number {
        if (!currentSection.currentSection) return 0;
        
        const totalItems = this.waypoints.length;
        const { currentSectionIndex } = currentSection;
        
        // Base progress using justify-content-around formula
        const itemProgress = ((2 * currentSectionIndex + 1) / (2 * totalItems)) * 100;
        
        // For last section, stay at exact position (90% for 5 items)
        if (currentSectionIndex === totalItems - 1) {
            return itemProgress;
        }
        
        // Add smooth transition within current section
        const sectionProgress = this.calculateSectionProgress(currentSection.currentSection, scrollTop);
        const nextItemProgress = ((2 * (currentSectionIndex + 1) + 1) / (2 * totalItems)) * 100;
        const progressIncrement = (nextItemProgress - itemProgress) * sectionProgress;
        
        return Math.min(itemProgress + progressIncrement, 100);
    }

    /**
     * Calculates how far through a section the user has scrolled (0-1)
     */
    private calculateSectionProgress(section: SectionWaypoint, scrollTop: number): number {
        const element = document.getElementById(section.id);
        if (!element) return 0;
        
        const elementTop = element.offsetTop - 100;
        const elementHeight = element.offsetHeight;
        
        return Math.min((scrollTop - elementTop) / elementHeight, 1);
    }
}
