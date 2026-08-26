import { useState, useEffect } from 'react';
import {
	VerticalTimeline,
	VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import BasicModal, { BasicModalType } from '../../shared/BasicModal';
import { JsonReader } from '../../shared/JsonReader';
import { JsonDataProps } from '../../types';
import './timeline.css';

// TODO: P50 - Documentation, add Projects (ask if I can use Pictures or recreate my additions), make this filterable, ...
/*
 * TODO:
 * - [ ] make this filterable (skills, languages, ...)
 * - [ ] add projects (ask if I can use Pictures or I need to recreate my additions)
 * - [ ] write my own timeline Component (to lessen npm security threads; 35+ issues in react-vertical-timeline-component)
 * - [ ] Documentation of code
 * - [ ] move timelineItems into own json file (text should be in public/ folder and imported)
 * - [ ] colors now dont match anymore => change them to fit new color scheme
 */

interface TimelineItemIcon {
	icon: string;
	iconStyle: React.CSSProperties;
}

interface TimelineItem extends TimelineItemIcon {
	date: string;
	sortDate?: string;
	noTime?: boolean;
	title: string;
	content?: React.ReactNode;
	modal?: BasicModalType;
}

interface ResumeTimeRange {
	start?: string;
	end?: string;
	months?: number;
	Reference?: number;
}

interface ResumeEntry {
	name: string;
	company?: string;
	organisation?: string;
	skills?: string[];
	time?: ResumeTimeRange;
	dateLabel?: string;
	content?: string;
}

interface ResumeJson {
	workExperience?: ResumeEntry[];
	uni?: ResumeEntry[];
	volunteerWork?: ResumeEntry[];
	projects?: ResumeEntry[];
}

function formatMonthYear(dateValue?: string): string {
	if (!dateValue) return '';

	const parsedDate = new Date(dateValue);
	if (Number.isNaN(parsedDate.getTime())) return dateValue;

	const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
	return `${month}.${parsedDate.getFullYear()}`;
}

function formatDateRange(start?: string, end?: string): string {
	if (!start && !end) return '';

	const startLabel = formatMonthYear(start);
	const endLabel = end ? formatMonthYear(end) : start ? 'now' : '';

	if (!startLabel) return endLabel;
	if (!endLabel) return startLabel;

	return `${startLabel} -- ${endLabel}`;
}

function toSortTimestamp(dateValue?: string): number {
	if (!dateValue) return Number.POSITIVE_INFINITY;

	const parsedDate = new Date(dateValue);
	if (Number.isNaN(parsedDate.getTime())) return Number.POSITIVE_INFINITY;

	return parsedDate.getTime();
}

function renderEntryContent(entry: ResumeEntry): React.ReactNode {
	if (entry.content) {
		const normalizedContent = entry.content
			.replace(/^<>\s*/, '')
			.replace(/\s*<\/>\s*$/, '');

		return <div dangerouslySetInnerHTML={{ __html: normalizedContent }} />;
	}

	if (entry.skills?.length) {
		return (
			<ul className="mb-0">
				{entry.skills.map((skill, index) => (
					<li key={`${skill}-${index}`}>{skill}</li>
				))}
			</ul>
		);
	}

	return null;
}

function createTimelineItems(
	entries: ResumeEntry[] | undefined,
	type: 'Education' | 'Work' | 'Project' | 'Certificate' | 'Volunteer',
	titleBuilder: (entry: ResumeEntry) => string,
	dateBuilder: (entry: ResumeEntry) => string
): TimelineItem[] {
	return (entries ?? []).map(entry => ({
		title: titleBuilder(entry),
		date: dateBuilder(entry),
		sortDate: entry.time?.end || entry.time?.start,
		noTime: !entry.time?.start && !entry.time?.end,
		content: renderEntryContent(entry),
		...getIcon(type),
	}));
}

function createUniversityTimelineItem(entries: ResumeEntry[]): TimelineItem {
	return {
		title: 'Universität',
		date: '10.2018 -- 06.2025',
		sortDate: '2025-06-30',
		noTime: false,
		content: (
			<ul className="mb-0">
				{entries.map((entry, index) => (
					<li key={`${entry.name}-${index}`}>
						{entry.name}
						{entry.skills?.length ? ` – ${entry.skills.join(', ')}` : ''}
					</li>
				))}
			</ul>
		),
		...getIcon('Education'),
	};
}

function createProjectTimelineItems(
	entries: ResumeEntry[] | undefined
): TimelineItem[] {
	return (entries ?? []).map(entry => ({
		title: `Project: ${entry.name}`,
		date: entry.dateLabel ?? '',
		sortDate: entry.time?.end || entry.time?.start,
		noTime: !entry.time?.start && !entry.time?.end,
		content: renderEntryContent(entry),
		...getIcon('Project'),
	}));
}

function mapResumeJsonToTimelineItems(data: ResumeJson): TimelineItem[] {
	return [
		...createTimelineItems(
			data.volunteerWork,
			'Volunteer',
			entry =>
				entry.organisation
					? `${entry.name} at ${entry.organisation}`
					: entry.name,
			entry => formatDateRange(entry.time?.start, entry.time?.end)
		),
		...(data.uni?.length ? [createUniversityTimelineItem(data.uni)] : []),
		...createTimelineItems(
			data.workExperience,
			'Work',
			entry =>
				entry.company ? `${entry.name} at ${entry.company}` : entry.name,
			entry => formatDateRange(entry.time?.start, entry.time?.end)
		),
		...createProjectTimelineItems(data.projects),
	].sort((left, right) => {
		if (left.noTime !== right.noTime) {
			return left.noTime ? -1 : 1;
		}

		const leftTime = toSortTimestamp(left.sortDate);
		const rightTime = toSortTimestamp(right.sortDate);

		if (leftTime === rightTime) return 0;
		return leftTime - rightTime;
	});
}

function getIcon(
	type: 'Education' | 'Work' | 'Project' | 'Certificate' | 'Volunteer'
): TimelineItemIcon {
	switch (type) {
		case 'Education':
			return {
				icon: 'school',
				iconStyle: { backgroundColor: '#031926', color: '#fff' },
			};
		case 'Work':
			return {
				icon: 'work',
				iconStyle: { backgroundColor: '#468189', color: '#fff' },
			};
		case 'Project':
			return {
				icon: 'code',
				iconStyle: { backgroundColor: '#77ACA2', color: '#fff' },
			};
		case 'Certificate':
			return {
				icon: 'award_star',
				iconStyle: { backgroundColor: '#9DBEBB', color: '#fff' },
			};
		case 'Volunteer':
			return {
				icon: 'volunteer_activism',
				iconStyle: { backgroundColor: '#9DBEBB', color: '#fff' },
			};
		default:
			return {
				icon: 'info',
				iconStyle: { backgroundColor: '#F8F0DE', color: '#fff' },
			};
	}
}

const CvTimeline: React.FC<JsonDataProps> = ({ pathToJson }) => {
	const [modalData, setModalData] = useState<BasicModalType>({
		show: false,
		title: '',
		content: null,
	});
	const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([]);

	const handleOpenModal = (
		e: React.MouseEvent,
		modal: BasicModalType | undefined
	) => {
		if (!modal) return;
		e.preventDefault();
		setModalData({
			show: true,
			title: modal.title || '',
			content: modal.content || null,
			size: modal.size,
		});
	};
	const handleCloseModal = () => {
		setModalData({
			show: false,
			title: '',
			content: null,
		});
	};

	/**
	 * Load content from external JSON file in public folder
	 * Provides separation of content from code for easier maintenance
	 */
	useEffect(() => {
		const reader = new JsonReader();
		reader.readJson(pathToJson).then((data: unknown) => {
			setTimelineItems(mapResumeJsonToTimelineItems(data as ResumeJson));
		});
	}, [pathToJson]);

	return (
		<div id="TimelineComponent" className="bg-warning-subtle">
			<hr />
			- English -<br />
			From here on some information and design may be missing or incomplete.
			Anything particularly rough is marked in light yellow.
			<br />
			<br />
			- Deutsch -<br />
			Ab hier können einige Informationen oder Designelemente fehlen oder
			unvollständig sein. Besonders unfertige Bereiche sind in hellem Gelb
			markiert.
			<hr />
			<div className="w-100 timeline d-pc-flex justify-content-center align-items-center mt-4">
				<span className="badge rounded-pill m-0 px-4">
					<h1>Timeline</h1>
				</span>
			</div>
			<div className="mb-n1 mt-4 timeline d-mobile-flex" id="TimelineComponent">
				<span
					className="badge rounded-pill m-0 pe-4 ps-5"
					style={{ transform: 'translateX(-2rem)' }}
				>
					<h1>Timeline</h1>
				</span>
			</div>
			<VerticalTimeline>
				{timelineItems.map((item, index) => (
					<VerticalTimelineElement
						key={index}
						date={item.date || undefined}
						dateClassName="date"
						icon={
							<div className="w-100 h-100 d-flex align-items-center justify-content-center">
								<span className="m-s-filled" style={{ fontSize: '2rem' }}>
									{item.icon}
								</span>
							</div>
						}
						iconStyle={item.iconStyle}
						intersectionObserverProps={{
							threshold: 0.05,
							triggerOnce: false,
						}}
					>
						<h3 className="vertical-timeline-element-title mb-2">
							{item.title}
						</h3>
						<div>{item.content}</div>
						{item.modal && (
							<div className="w-100 d-flex justify-content-end align-items-center mt-3">
								<button
									type="button"
									className="btn link-secondary me-4 text-decoration-none d-flex align-items-center p-0 border-0"
									onClick={e => handleOpenModal(e, item.modal)}
								>
									<span className="m-s-filled fs-5 me-1">tab_move</span>{' '}
									<span className="text-decoration-underline">more</span>
								</button>
							</div>
						)}
					</VerticalTimelineElement>
				))}
				<VerticalTimelineElement />
			</VerticalTimeline>
			{/* Interested-Element - PC */}
			<div className="w-100 timeline d-pc-flex bottom justify-content-center align-items-center mt-2 pt-1 pb-4">
				<div className="circle circle-xl z-0 position-relative">
					<div className="circle circle-md z-0" />
					<div
						className="circle circle-lg z-1"
						style={{ transform: 'translateX(120%)translateY(60%)' }}
					/>
					<div className="position-absolute top-50 start-50 translate-middle text-center">
						<p
							className="m-0 fw-bold shadows-into-light-two-regular"
							style={{
								transform: 'translateX(-35%)translateY(10%)rotate(-30deg)',
								fontSize: '5vw',
							}}
						>
							Interested?
						</p>
						<p
							className="m-0 fw-bold text-nowrap"
							style={{
								transform: 'translateX(15%)translateY(-165%)rotate(-30deg)',
								fontSize: '2.4vw',
							}}
						>
							I'm just a message away.
						</p>
					</div>
				</div>
			</div>
			{/* Interested-Element - Mobile */}
			<div
				className="w-100 timeline d-mobile-flex mt-2 pt-1 pb-4"
				style={{ transform: 'translateY(-7rem)' }}
			>
				<div
					className="circle circle-xl position-relative"
					style={{ transform: 'translateX(-40%)' }}
				>
					<div
						className="circle circle-lg z-0"
						style={{ transform: 'translateX(160%)translateY(80%)' }}
					/>
					<div
						className="position-absolute w-100 h-100 z-1"
						style={{
							borderRadius: '50%',
							overflow: 'hidden',
							top: 0,
							left: 0,
						}}
					/>
					<div
						className="position-relative circle circle-md z-3"
						style={{
							transform: 'translateX(300%)translateY(-200%)',
						}}
					/>

					<div className="position-absolute top-50 start-50 translate-middle text-center z-2">
						<h1 className="m-0 shadows-into-light-two-regular timeline">
							Interested?
						</h1>
						<h2 className="m-0 text-nowrap timeline">
							I'm just a message away.
						</h2>
					</div>
				</div>
			</div>
			{/* Modal for displaying details */}
			{/* TODO: P75 - move this into App.js if possible to have only one modal */}
			<BasicModal
				show={modalData.show || false}
				title={modalData.title}
				content={modalData.content}
				size={modalData.size}
				onClose={handleCloseModal}
			/>
		</div>
	);
};

export default CvTimeline;
