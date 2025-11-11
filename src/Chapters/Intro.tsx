import * as React from 'react';
import { useEffect, useState } from 'react';
import { JsonReader } from '../shared/JsonReader';
import { useSettings } from '../contexts/AppContext';
import {
	JsonDataProps,
	GridSectionProps,
	ImageDataType,
	TextDataType,
	AboutMeData,
	RowSection,
	StyleConstants,
} from '../types';

/**
 * - [ ] types/ interfaces into types folder
 * - [ ] Structure images in dedicated folder
 * - [ ] move hardcoded text into public folder (one location to edit without editing code in future)
 * - [ ] check uniform definition of variables (A_VARIABLE VS aVariable VS ...) => document this in README!
 * - [ ] check if JavaDoc style comments are used everywhere
 */
// TODO: P50 - limit screen width for very large screens (e.g. 4k) - otherwise layout breaks
// TODO: P50 - mobile view (some elements hide themself under certain width - e.g. footer => check if all mobile layouts are implemented)
// TODO: P50 - make name be on application photo

// ========================================================================================
// COMPONENT PROPS
// ========================================================================================

interface IntroProps extends JsonDataProps {}

// ========================================================================================
// CONSTANTS & CONFIGURATION
// ========================================================================================

/**
 * CSS class constants for consistent styling across the component
 */
const STYLES: StyleConstants = {
	LAYOUT: {
		FULL_ROW: 'm-0 row d-flex justify-content-between w-100',
		CONTAINER: 'p-0 h-100',
	},
	BORDERS: {
		TOP_BOTTOM: 'border-top border-bottom border-5 p-0',
		LEFT: 'border-start border-5 p-0',
		RIGHT: 'border-end border-5',
	},
	IMAGE: {
		FULL_SIZE: 'w-100 h-100',
	},
} as const;

/**
 * Parallax effect configuration
 * Conservative values to prevent visual artifacts
 */
// const PARALLAX_CONFIG = {
//     ZOOM_AMOUNT: 1.05,              // Fixed zoom to prevent background showing through
//     MAX_MOVEMENT_PERCENT: 0.8,      // Maximum movement as percentage of screen size
//     TRANSITION_DURATION: '120s',    // Animation transition duration - smooth but responsive
//     TRANSITION_DELAY: '800s',         // Animation transition delay - starts 2s after mouse move
// } as const;

// ========================================================================================
// UTILITY FUNCTIONS
// ========================================================================================

/**
 * Maps border direction to corresponding CSS class
 * @param direction - Border direction configuration
 * @returns Corresponding Bootstrap border class
 */
const getBorderClass = (
	direction: GridSectionProps['borderDirection']
): string => {
	const borderMap = {
		'top-bottom': STYLES.BORDERS.TOP_BOTTOM,
		left: STYLES.BORDERS.LEFT,
		right: STYLES.BORDERS.RIGHT,
		none: '',
	} as const;

	return borderMap[direction || 'none'];
};

/**
 * Creates consistent section styling with height constraints
 * @param height - CSS height value
 * @returns Style object for section container
 */
const createSectionStyle = (height: string): React.CSSProperties => {
	console.debug('height', height);
	return {
		height,
		minHeight: 0,
		overflow: 'hidden',
	};
};

// ========================================================================================
// COMPONENT DEFINITIONS
// ========================================================================================

/**
 * Introduction page component featuring a responsive image collage layout
 *
 * This component creates a full-viewport introduction section with:
 * - 3-row responsive grid (1:4:1 height ratio)
 * - Subtle mouse-based parallax effects on all images
 * - Dynamic content loading from external JSON
 * - Consistent Bootstrap-based styling with custom borders
 *
 * @returns JSX element containing the complete introduction section
 */
const Intro: React.FC<IntroProps> = ({ pathToJson }) => {
	// Global state from context
	const settings = useSettings();

	// Local state for component-specific data
	const [aboutMeData, setAboutMeData] = useState<AboutMeData | null>(null);

	/**
	 * Optimized image component with parallax effects
	 */
	const ImageCollage: React.FC<{
		config: ImageDataType;
		containerClass?: string;
	}> = ({ config, containerClass = 'col' }) => {
		const { src, alt, objectPosition, useContain = false } = config;

		// Calculate parallax transform with safety bounds
		// const { offsetX, offsetY } = calculateParallaxTransform(mousePosition, screenSize);

		const imageStyle: React.CSSProperties = {
			width: '100%',
			height: '100%',
			objectFit: useContain ? 'contain' : 'cover',
			objectPosition,
		};

		return (
			<div
				className={`${STYLES.LAYOUT.CONTAINER} ${containerClass}`}
				style={{ overflow: 'hidden' }}
			>
				<img
					src={src}
					alt={alt}
					style={imageStyle}
					className={useContain ? STYLES.IMAGE.FULL_SIZE : ''}
				/>
			</div>
		);
	};

	/**
	 * Flexible grid section component with configurable borders
	 *
	 * @param children - Child components to render
	 * @param className - Additional CSS classes
	 * @param flex - CSS flex value for height distribution
	 * @param borderDirection - Border placement configuration
	 * @param style - Additional inline styles
	 */
	const GridSection: React.FC<GridSectionProps> = ({
		children,
		className = '',
		flex,
		borderDirection = 'none',
		style: propStyle,
	}) => {
		const borderClass = getBorderClass(borderDirection);
		const flexStyle = flex ? { flex } : undefined;
		const combinedStyle = { ...flexStyle, ...propStyle };
		const combinedClassName =
			`${STYLES.LAYOUT.FULL_ROW} ${borderClass} ${className}`.trim();

		return (
			<div className={combinedClassName} style={combinedStyle}>
				{children}
			</div>
		);
	};

	/**
	 * Load content from external JSON file in public folder
	 * Provides separation of content from code for easier maintenance
	 */
	useEffect(() => {
		const reader = new JsonReader();
		reader.readJson(pathToJson).then(data => {
			setAboutMeData(data as AboutMeData);
		});
	}, [pathToJson]);

	/**
	 * Renders individual cells (images or text) within a row
	 */
	const renderCell = (
		cell: ImageDataType | TextDataType,
		index: number,
		cellLength: number
	): React.ReactNode => {
		// Add border-right to all elements except the last one in the row
		const isLastCell = index === cellLength - 1;
		const borderClass = isLastCell ? '' : STYLES.BORDERS.RIGHT;

		if (cell.type === 'image') {
			const containerClass = `${
				cell.bootstrapSizeClass || 'col'
			} p-0 ${borderClass}`.trim();
			return (
				<ImageCollage
					key={index}
					config={cell}
					containerClass={containerClass}
				/>
			);
		} else if (cell.type === 'text') {
			const containerClass = `${
				cell.bootstrapSizeClass || 'col-4'
			} ${borderClass}`.trim();
			return (
				<div
					key={index}
					className={`${containerClass} d-flex flex-column justify-content-start align-content-center p-3 h-100`}
				>
					<div className="h-100 overflow-auto">
						<h1 className="d-flex align-content-center mt-4 flex-shrink-0">
							<span className="m-s-filled px-2">frame_person</span>
							{cell.title}
						</h1>
						<div className="mx-2 px-2 pb-3 flex-grow-1">
							{cell.content.map((paragraph: string, pIndex: number) => (
								<p key={pIndex} className={pIndex === 0 ? '' : 'mt-2'}>
									{paragraph}
								</p>
							))}
							{cell.footer && (
								<i
									className="w-100 align-self-center"
									style={{
										color: settings['color-styles']['text-secondary'],
									}}
								>
									<strong>{cell.footer}</strong>
								</i>
							)}
						</div>
					</div>
				</div>
			);
		}
		return null;
	};

	/**
	 * Renders a complete row section
	 */
	const renderRowSection = (
		row: RowSection,
		rowIndex: number
	): React.ReactNode => {
		const isGrowRow = row.type === 'grow';
		// const flex = isGrowRow ? "4" : "1";
		const borderDirection = isGrowRow ? 'top-bottom' : 'none';
		const height = 'calc(' + row.size + ')';

		// TODO: P100 - remove eslint
		// eslint-disable-next-line
		function calcCutOff(row: RowSection) {
			if (!row.cutOff) return null;
			if (row.cutOff.left === 't' && row.cutOff.right === 'b') {
			}
			if (row.cutOff.left === 'b' && row.cutOff.right === 't') {
			}
			return null;
		}

		return (
			<GridSection
				key={rowIndex}
				borderDirection={borderDirection}
				style={createSectionStyle(height)}
			>
				{row.content.map((cell, cellIndex) =>
					renderCell(cell, cellIndex, row.content.length)
				)}
			</GridSection>
		);
	};

	// ========================================================================================
	// RENDER
	// ========================================================================================

	return (
		<div
			className={`w-100 d-flex flex-column position-relative`}
			style={{
				height: 'calc(100vh + 100vh / 6)', // TEMP: works
				backgroundColor:
					settings['color-styles']['background-primary'] || undefined,
				color: settings['color-styles']['text-primary'] || undefined,
			}}
			id="AboutMeComponent"
		>
			{aboutMeData &&
				Object.entries(aboutMeData).map(([_, rowSection], index) =>
					renderRowSection(rowSection, index)
				)}

			{/* Gradient overlay
            <div
                className="position-absolute start-0 end-0"
                style={{
                    bottom: '0rem',
                    height: '100px',
                    background: `linear-gradient(to top, ${settings["color-styles"]["background-primary"]}, ${settings["color-styles"]["background-primary"]}BF, transparent)`,
                    pointerEvents: 'none'
                }}
            />*/}
		</div>
	);
};

export default Intro;
