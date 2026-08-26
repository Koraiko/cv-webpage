import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import {
	ReactOriginal,
	AngularOriginal,
	JavascriptOriginal,
	TypescriptOriginal,
	Css3Original,
	Html5Original,
	JavaOriginal,
	VscodeOriginal,
	GitOriginal,
	NpmOriginalWordmark,
	EslintOriginal,
	// TODO: P100 - clean-up eslint-disable-next-line
	// eslint-disable-next-line
	ChromeOriginal,
	PrologOriginal,
	NodejsOriginalWordmark,
	BootstrapOriginal,
	MatlabOriginal,
	CplusplusOriginal,
	HaskellOriginal,
	GodotOriginal,
} from 'devicons-react';
import ScrollInOut from '../../components/ScrollInOut';
import { useSettings } from '../../contexts/AppContext';
import { JsonReader } from '../../shared/JsonReader';

interface EventSkill {
	name: string;
	skills: string[];
	time?: {
		months: number;
	};
}

interface EventToSkillType {
	[category: string]: EventSkill[];
}

interface SectionInfo {
	title: string;
	content: SkillItem[];
}
interface SkillItem {
	name: string;
	icon?: ReactElement<any, any>;
}
const iconSize = '60';
const containerSize = parseInt(iconSize) + 40; // Add more padding for card padding

const skillItems: SectionInfo[] = [
	{
		title: 'Frontend',
		content: [
			{
				name: 'JavaScript',
				icon: <JavascriptOriginal size={iconSize} />,
			},
			{
				name: 'TypeScript',
				icon: <TypescriptOriginal size={iconSize} />,
			},
			{
				name: 'HTML',
				icon: <Html5Original size={iconSize} />,
			},
			{
				name: 'CSS',
				icon: <Css3Original size={iconSize} />,
			},
			{
				name: 'Bootstrap',
				icon: <BootstrapOriginal size={iconSize} />,
			},
			{
				name: 'Angular',
				icon: <AngularOriginal size={iconSize} />,
			},
			{
				name: 'React',
				icon: <ReactOriginal size={iconSize} />,
			},
		],
	},
	{
		title: 'Backend',
		content: [
			{
				name: 'Java',
				icon: <JavaOriginal size={iconSize} />,
			},
			{
				name: 'SQL',
				icon: (
					<span className="m-s-filled" style={{ fontSize: iconSize + 'px' }}>
						database{' '}
					</span>
				),
			},
			{
				name: 'NoSQL',
				icon: (
					<div style={{ position: 'relative', display: 'inline-block' }}>
						<span className="m-s-filled" style={{ fontSize: iconSize + 'px' }}>
							database
						</span>
						<span
							className="m-s-filled"
							style={{
								fontSize: parseInt(iconSize) * 0.45 + 'px',
								position: 'absolute',
								bottom: '0%',
								right: '0%',
								transform: 'translate(15%, -5%)',
								textShadow:
									'-2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white, 2px 2px 0 white',
							}}
						>
							data_object
						</span>
					</div>
				),
			},
			{
				name: 'Node.js',
				icon: <NodejsOriginalWordmark size={iconSize} />,
			},
			{
				name: 'C++',
				icon: <CplusplusOriginal size={iconSize} />,
			},
			{
				name: 'Prolog',
				icon: <PrologOriginal size={iconSize} />,
			},
			{
				name: 'Haskell',
				icon: <HaskellOriginal size={iconSize} />,
			},
		],
	},
	{
		title: 'Tools & CO',
		content: [
			{
				name: 'VS Code',
				icon: <VscodeOriginal size={iconSize} />,
			},
			{
				name: 'Git',
				icon: <GitOriginal size={iconSize} />,
			},
			{
				name: 'npm',
				icon: <NpmOriginalWordmark size={iconSize} />,
			},
			{
				name: 'ESLint',
				icon: <EslintOriginal size={iconSize} />,
			},
			{
				name: 'MatLab',
				icon: <MatlabOriginal size={iconSize} />,
			},
			{
				name: 'Clip Studio Paint Pro v2',
			},
			{
				name: 'DaVinci Resolve',
			},
			{
				name: 'Godot',
				icon: <GodotOriginal size={iconSize} />,
			},
		],
	},
	{
		title: 'Methods',
		content: [
			{
				name: 'Scrum',
			},
			{
				name: 'Kanban',
				icon: (
					<span className="m-s-filled" style={{ fontSize: iconSize + 'px' }}>
						view_kanban
					</span>
				),
			},
		],
	},
];

// TODO: Matlab, Moodle,

const CvOverview: React.FC = () => {
	const [eventSkills, setEventSkills] = useState<EventToSkillType | null>(null);
	const settings = useSettings();

	// CSS styles for flip animation
	// TODO: P100 - move to css file/ use bootstrap
	const flipStyles = `
    .flip-card-container:hover .flip-card {
      transform: rotateX(180deg);
    }

    .flip-card {
      width: 100%;
      height: 100%;
      position: relative;
      transform-style: preserve-3d;
      transition: transform 0.6s;
    }

    .flip-card-front,
    .flip-card-back {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      border-radius: 0.375rem;
      background-color: #FFFFFF;
    }

    .flip-card-back {
      transform: rotateX(180deg);
    }
  `;

	useEffect(() => {
		const reader = new JsonReader();
		reader.readJson('/content/resume.json').then((data: unknown) => {
			setEventSkills(data as EventToSkillType);
		});
	}, []);

	const skillsUsedWhere = (skillName: string): string[] => {
		if (!eventSkills) return [];
		const foundEvents: string[] = [];

		// Iterate through all categories in EventToSkill
		Object.keys(eventSkills).forEach(category => {
			eventSkills[category].forEach(event => {
				if (event.skills.includes(skillName)) {
					foundEvents.push(event.name);
				}
			});
		});

		// Todo: events that are in resume.json but are not inside skillItems should be displayed (-> are currently hidden D: )
		return foundEvents;
	};

	const cardDesign =
		'd-flex justify-content-center align-items-center rounded p-2';

	const FlipCard = ({
		front,
		back,
	}: {
		front: ReactNode;
		back?: ReactNode;
	}) => (
		<div className="flip-card">
			<div
				className={`flip-card-front ${cardDesign} ${!back ? 'fw-bold text-center' : ''}`}
			>
				{front}
			</div>
			{back && (
				<div className={`flip-card-back ${cardDesign} fw-bold text-center`}>
					{back}
				</div>
			)}
		</div>
	);

	const SkillItems = ({ skill, index }: { skill: SkillItem; index: number }) =>
		skill.icon ? (
			<div
				key={index}
				className="flip-card-container m-1"
				style={{
					width: `${containerSize}px`,
					height: `${containerSize}px`,
				}}
			>
				<FlipCard
					front={skill.icon}
					back={
						<div title={skillsUsedWhere(skill.name).join(', ')}>
							{skill.name}
						</div>
					}
				/>
			</div>
		) : (
			<div
				key={index}
				className="m-1"
				style={{
					width: `${containerSize}px`,
					height: `${containerSize}px`,
				}}
			>
				<FlipCard
					front={
						<div title={skillsUsedWhere(skill.name).join(', ')}>
							{skill.name}
						</div>
					}
				/>
			</div>
		);

	const SkillGroup = React.forwardRef<HTMLDivElement, { item: SectionInfo }>(
		({ item }, ref) => {
			console.log(
				'border color value:',
				settings['color-styles']['background-primary']
			);
			return (
				<div
					className="border-0 rounded h-100"
					style={{
						backgroundColor: settings['color-styles']['background-primary'],
					}}
				>
					<div
						ref={ref}
						className={`d-flex flex-column justify-content-start align-items-center p-4 m-1 border-0 rounded h-100`}
						style={{
							backgroundColor: settings['color-styles']['background-secondary'],
						}}
					>
						<h2 className="text-center">{item.title}</h2>
						<hr className="w-100 border-2 m-0 p-0" />
						<div
							className={`d-flex flex-wrap justify-content-center p-4 pt-1 mt-1 w-100`}
						>
							{item.content.map((skill, idx) => (
								<SkillItems key={idx} skill={skill} index={idx} />
							))}
						</div>
					</div>
				</div>
			);
		}
	);
	SkillGroup.displayName = 'SkillGroup';

	return (
		<div id="TechStackComponent" className={`w-100 d-flex my-4 py-4`}>
			<style>{flipStyles}</style>

			<ScrollInOut
				direction="scale"
				ease="back.out(2)"
				duration={3}
				stagger={0.2}
				className="d-flex flex-column flex-lg-row justify-content-between w-100"
				debugMode={false}
			>
				{skillItems.map((item, index) => (
					<div key={index}>
						<SkillGroup item={item} />
					</div>
				))}
			</ScrollInOut>
		</div>
	);
};

export default CvOverview;
