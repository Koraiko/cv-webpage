import React from 'react';
import { useSettings } from '../contexts/AppContext';

interface CardProps {
	children: React.ReactNode;
	width: string;
	height?: string;
	className?: string;
}

const Card: React.FC<CardProps> = ({ children, width, height, className }) => {
	const settings = useSettings();
	const cardHeight = height ?? width;

	return (
		<div
			className={`card m-2 p-0 ${className}`}
			style={{
				width: width,
				height: cardHeight,
				overflow: 'hidden',
				backgroundColor:
					settings['color-styles']['background-secondary'] || undefined,
			}}
		>
			{children}
		</div>
	);
};

export default Card;
