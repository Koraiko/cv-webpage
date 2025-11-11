import React from 'react';

interface CardsContainerProps {
	children: React.ReactNode;
}

const CardsContainer: React.FC<CardsContainerProps> = ({ children }) => {
	return <div className="d-flex flex-wrap w-100">{children}</div>;
};

export default CardsContainer;
