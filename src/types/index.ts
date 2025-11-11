/**
 * Centralized type definitions for the CV webpage application
 * This file contains all shared interfaces and types used across components
 */

// ========================================================================================
// GLOBAL APPLICATION TYPES
// ========================================================================================

/**
 * Settings interface for application configuration
 * Controls global styling and behavior across the application
 */
export interface Settings {
	'color-styles': {
		'background-primary': string | undefined;
		'background-secondary': string | undefined;
		'text-primary': string | undefined;
		'text-secondary': string | undefined;
		highlight: string | undefined;
	};
}

/**
 * Global application state interface
 */
export interface AppState {
	settings: Settings;
	isLoading: boolean;
}

// ========================================================================================
// COMPONENT PROPS TYPES
// ========================================================================================

/**
 * Props for components that need JSON data loading
 */
export interface JsonDataProps {
	pathToJson: string;
}

/**
 * Props for flexible grid section component
 */
export interface GridSectionProps {
	children: React.ReactNode;
	className?: string;
	flex?: string;
	borderDirection?: 'top-bottom' | 'left' | 'right' | 'none';
	style?: React.CSSProperties;
}

// ========================================================================================
// CONTENT DATA TYPES
// ========================================================================================

/**
 * Structure for image data content
 */
export interface ImageDataType {
	type: 'image';
	src: string;
	alt: string;
	objectPosition: string;
	useContain?: boolean;
	overlayText?: string;
	author?: string;
	bootstrapSizeClass?: string;
}

/**
 * Structure for text content data
 */
export interface TextDataType {
	type: 'text';
	title: string;
	content: string[];
	footer?: string;
	bootstrapSizeClass?: string;
}

// TODO: P50 - cutOff -> cut off pictures at the bottom with linear cut (i.e. top left to bottom right)
/**
 * Structure for row sections containing images or text
 */
export interface RowSection {
	type: 'shrink' | 'grow';
	content: (ImageDataType | TextDataType)[];
	size: string;
	cutOff?: {
		left: 't' | 'b';
		right: 't' | 'b';
	};
}

/**
 * Type for the complete about me data structure
 */
export interface AboutMeData {
	[key: string]: RowSection;
}

// ========================================================================================
// UTILITY TYPES
// ========================================================================================

/**
 * Union type for all possible data cell types
 */
export type CellDataType = ImageDataType | TextDataType;

/**
 * Configuration for viewport heights
 */
export interface ViewportHeights {
	MAIN_SECTION: string;
	TOP_BOTTOM_SECTION: string;
}

/**
 * CSS styling constants structure
 */
export interface StyleConstants {
	LAYOUT: {
		CONTAINER: string;
		FULL_ROW: string;
	};
	IMAGE: {
		FULL_SIZE: string;
	};
	BORDERS: {
		TOP_BOTTOM: string;
		LEFT: string;
		RIGHT: string;
	};
}
