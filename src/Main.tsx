import React, { useState } from 'react';
import CvOverview from './Chapters/Cv/CvOverview';
import CvTimeline from './Chapters/Cv/CvTimeline';
import ContactMe from './Chapters/ContactMe/ContactMe';
import Inspiration from './Chapters/Inspiration';
import Intro from './Chapters/Intro';
// TODO: P100 - remove eslint
// eslint-disable-next-line
import Footer from './Layout/Footer';
// TODO: P100 - remove eslint
// eslint-disable-next-line
import AnimationExamples from './components/AnimationExamples';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSettings } from './contexts/AppContext';

gsap.registerPlugin(Observer, ScrollTrigger);
/**
 * Main App component that handles page-based navigation with GSAP animations
 * Features smooth transitions between pages and intelligent scroll handling
 */
const Main: React.FC = () => {
	const settings = useSettings();
	const [mouseInsideWarning, setMouseInsideWarning] = useState(false);

	// Page components configuration
	const pageComponents: JSX.Element[] = [
		<Intro pathToJson="/content/aboutMe.json" />,
		/*<AnimationExamples />,*/ <CvOverview />,
		<CvTimeline />,
		<ContactMe />,
		<Inspiration />,
	];

	// TODO: P50 - remove GSAP here => fix footer navigation not working

	function showAlert(target: HTMLDivElement) {
		setMouseInsideWarning(false);
	}
	function hideAlert(target: HTMLDivElement) {
		setMouseInsideWarning(true);
	}

	return (
		<div
			id="main-container"
			style={{
				backgroundColor:
					settings['color-styles']['background-primary'] || '#ffffff',
				color: settings['color-styles']['text-primary'] || '#000000',
			}}
		>
			<div
				className="w-100 position-fixed p-2"
				id="WIP-alert"
				onMouseEnter={e => hideAlert(e.currentTarget as HTMLDivElement)}
				onMouseLeave={e => showAlert(e.currentTarget as HTMLDivElement)}
				style={{
					opacity: mouseInsideWarning ? '0%' : '100%',
					zIndex: 1000,
				}}
			>
				<div className="alert alert-warning w-100 text-center" role="alert">
					<strong>Under Construction!</strong>
					<br /> This page is currently being developed. Some information may{' '}
					<u>not be complete</u> and features may <u>not work as expected</u>.
				</div>
			</div>
			{pageComponents.map((page, index) => (
				<div className="p-0 m-0" key={index} id={page.type.name}>
					{page}
				</div>
			))}
			{/* TODO: P25 - Footer doesnt work anymore
            <Footer
                pages={pageComponents}
                onNavigate={(n)=>{return;}}
                currentPageIndex={0}
            /> */}
		</div>
	);
};

export default Main;
