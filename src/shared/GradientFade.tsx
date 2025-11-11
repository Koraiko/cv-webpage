import React from 'react';

/**
 * Direction type for gradient fade effect
 */
export type GradientDirection =
	| 'top'
	| 'bottom'
	| 'left'
	| 'right'
	| 'top_bottom'
	| 'left_right';

/**
 * Props for the GradientFade component
 */
interface GradientFadeProps {
	/** Direction of the gradient fade effect */
	direction: GradientDirection;
	/** Child components to apply the gradient over */
	children: React.ReactNode;
	/** Optional custom CSS class */
	className?: string;
	/** Optional size of the fade area as percentage (0-100, default: 50) */
	fadeSize?: number;
	/** Optional additional styles */
	style?: React.CSSProperties;
}

/**
 * Maps direction to CSS linear-gradient direction
 */
const getGradientDirection = (direction: GradientDirection): string => {
	const directionMap = {
		top: 'to top',
		bottom: 'to bottom',
		left: 'to left',
		right: 'to right',
		top_bottom: 'to bottom', // Will be handled specially in gradient creation
		left_right: 'to right', // Will be handled specially in gradient creation
	};
	return directionMap[direction];
};

const GradientFade: React.FC<GradientFadeProps> = ({
	direction,
	children,
	className = '',
	fadeSize = 50,
	style = {},
}) => {
	// Create the gradient mask for fading content visibility
	const fadeStart = 100 - fadeSize;
	const fadeEnd = fadeSize;

	let gradient: string;

	if (direction === 'top_bottom') {
		// Fade from top and bottom towards center
		gradient = `linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) ${fadeEnd}%, rgba(255, 255, 255, 1) ${fadeStart}%, rgba(255, 255, 255, 0) 100%)`;
	} else if (direction === 'left_right') {
		// Fade from left and right towards center
		gradient = `linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) ${fadeEnd}%, rgba(255, 255, 255, 1) ${fadeStart}%, rgba(255, 255, 255, 0) 100%)`;
	} else {
		// Single direction fade
		const gradientDirection = getGradientDirection(direction);
		gradient = `linear-gradient(${gradientDirection}, rgba(255, 255, 255, 1) ${fadeStart}%, rgba(255, 255, 255, 0) 100%)`;
	}

	// Make the container behave exactly like its parent would
	const containerStyle: React.CSSProperties = {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		height: '100%',
		WebkitMask: gradient,
		mask: gradient,
		...style,
	};

	return (
		<div className={className} style={containerStyle}>
			{children}
		</div>
	);
};

export default GradientFade;
