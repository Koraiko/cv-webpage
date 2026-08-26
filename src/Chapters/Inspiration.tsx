import React from 'react';
import Card from '../components/Card';
import CardsContainer from '../components/CardsContainer';
import { useSettings } from '../contexts/AppContext';

const LinkIcon: React.FC<{ link: string; className?: string }> = ({
	link,
	className,
}) => (
	<a
		href={link}
		target="_blank"
		rel="noopener noreferrer"
		aria-label="external link"
		className={`d-inline-flex align-items-center m-0 p-0 text-decoration-none text-reset ${className}`}
	>
		<Icon name="open_in_new" />
	</a>
);
const Icon: React.FC<{ name: string }> = ({ name }) => (
	<span className="m-s-filled">{name}</span>
);

const Inspiration = () => {
	const settings = useSettings();

	const inspirationCvPages = [
		{
			name: 'Aditya Seth',
			url: 'https://adityaseth.in/',
			type: 'Portfolio',
		},
		{
			name: 'Dr. Aditya Kumar Gupta',
			url: 'https://aditya30051993.github.io/my-portfolio',
			type: 'Portfolio',
		},
		{
			name: 'Abhishek Ganvir',
			url: 'https://abhishekganvir.vercel.app/',
			type: 'Portfolio',
		},
		{
			name: 'Tajmirul',
			url: 'https://www.me.toinfinite.dev/',
			type: 'Portfolio',
		},
	];

	return (
		<>
			<div className="fade-item">
				Designed & Developed by me
				<br />
				<h1>Inspirations</h1>
				<CardsContainer>
					{inspirationCvPages.map((inspiration, index) => (
						<Card key={index} width={'150px'} className="p-2">
							<div>{inspiration.name}</div>
							<div className="p-0 d-flex align-items-end ms-auto mt-auto flex-column">
								<span
									className="me-auto px-2 py-1 rounded"
									style={{
										backgroundColor:
											settings['color-styles']['text-primary'] + '55',
									}}
								>
									{inspiration.type}
								</span>
								<LinkIcon link={inspiration.url} className="m-1" />
							</div>
						</Card>
					))}
				</CardsContainer>
			</div>
		</>
	);
};

export default Inspiration;
