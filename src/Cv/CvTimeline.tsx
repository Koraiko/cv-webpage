import * as React from 'react';
import { useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { JSX } from 'react/jsx-runtime';
import BasicModal, { BasicModalType } from '../shared/BasicModal';
import SkillLabel from '../shared/Labels/SkillLabels';
import { Button } from 'react-bootstrap';
import ImageCarousel from '../shared/ImageCarousel';

interface TimelineItemIcon {
    icon: string,
    iconStyle: React.CSSProperties
}

interface TimelineItem extends TimelineItemIcon {
    date: string,
    title: string,
    location: string,
    content?: React.ReactNode,
    modal?: BasicModalType
}

function getIcon(type: 'Education' | 'Work' | 'Project' | 'Certificate' | 'Volunteer'): TimelineItemIcon {
    switch (type) {
        case 'Education':
            return {
                icon: "school",
                iconStyle: { backgroundColor: '#031926', color: '#fff' }
            };
        case 'Work':
            return {
                icon: "work",
                iconStyle: { backgroundColor: '#468189', color: '#fff' }
            };
        case 'Project':
            return {
                icon: "code",
                iconStyle: { backgroundColor: '#77ACA2', color: '#fff' }
            };
        case 'Certificate':
            return {
                icon: "award_star",
                iconStyle: { backgroundColor: '#9DBEBB', color: '#fff' }
            };
        case 'Volunteer':
            return {
                icon: "volunteer_activism",
                iconStyle: { backgroundColor: '#9DBEBB', color: '#fff' }
            };
        default:
            return {
                icon: "info",
                iconStyle: { backgroundColor: '#F8F0DE', color: '#fff' }
            };
    }
};

const CvTimeline = (): JSX.Element => {
    const [modalData, setModalData] = useState<BasicModalType>({
        show: false,
        title: '',
        content: null,
    });

    const handleOpenModal = (e: React.MouseEvent, modal: BasicModalType | undefined) => {
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

    const timelineItems: TimelineItem[] = [
        {
            title: 'Volunteer at school',
            location: 'Ulm, Germany',
            content:
                <>

                    <ul>
                        <li>2014 -- 2017: Supervised weekly "Computer Leisure Time" sessions for students</li>
                        <li>2017 -- 2018: Designed the yearbook and graduation booklet</li>
                    </ul>
                </>,
            date: "2014 -- 2018",
            ...getIcon('Volunteer'),
        },
        {
            title: 'Abitur',
            location: 'Ulm, Germany',
            content:
                <>General university entrance qualification with a basic computer science subject.</>,
            date: "09.2010 -- 07.2018",
            ...getIcon('Education'),
        },
        {
            title: 'Volunteer at university',
            location: 'Ulm, Germany',
            content:
                <>
                    <ul>
                        <li>Member of the student council for the computer science department</li>
                        <li>Organized and supported university events</li>
                        <li>Held roles such as protocol secretary and office access coordinator</li>
                    </ul>
                </>,
            date: "10.2021 -- 06.2025",
            ...getIcon('Volunteer'),
        },
        {
            title: 'Bachelor of Science in Computer Science',
            location: 'Ulm, Germany',
            content:
                <>
                    Completed studies with a focus on web engineering, IT security and software development. <br />
                    The bachelor thesis focused on implementing coordination processes in a web-based BPM tool using Angular, TypeScript, and ArangoDB.
                </>,
            date: "10.2018 -- 06.2025",
            ...getIcon('Education'),
        },
        {
            title: 'Frontend Developer at RehaCat+',
            location: 'Ulm, Germany',
            content:
                <>
                    <p>
                        Working on a medical web application by refactoring and restructuring legacy code,
                        migrating to TanStack Table, upgrading from Bootstrap 4 to 5, and eliminating custom CSS.
                        Collaborating in an interdisciplinary team using Scrum and Kanban workflows.
                    </p>
                </>,
            date: "10.2024 -- 06.2025",
            ...getIcon('Work'),
            modal: {
                title: 'Student Assistant Developer for RehaCat+',
                size: 'xl',
                content: (
                    <>
                        <div className='container w-100'>
                            <div className='row py-2'>
                                {/* left side (img carousel) */}
                                <div className='col-xl-6 d-flex justify-content-center'>
                                    <ImageCarousel
                                        imageArray={[
                                            {
                                                path: "/img/2025-SSM.jpg",
                                                description: "TODO"
                                            },
                                        ]}
                                        roundedImg={true}
                                        id="rehaCatCarousel"
                                    />
                                </div>
                                {/* right side (intro text) */}
                                <div className='col-xl-6 p-5'>
                                    <h5>Overview</h5>
                                    <p>
                                        Contributed to the medical web app RehaCat+ at Ulm University, used in adaptive diagnostics research.
                                        Worked in an agile team with a focus on frontend development and code quality.
                                    </p>

                                    <ul>
                                        <li>Built new features using React and TypeScript</li>
                                        <li>Refactored cluttered frontend code</li>
                                        <li>Modernized UI (migrated custom CSS to Bootstrap 5)</li>
                                        <li>Integrated TanStack Table (sorting, filtering)</li>
                                        <li>Created and maintained technical documentation (JavaDoc)</li>
                                        <li>Reviewed code and provided feedback</li>
                                    </ul>

                                    <h5>Technologies Used</h5>
                                    <SkillLabel
                                        content={{
                                            progLang: ["TypeScript", "JavaScript", "HTML", "CSS"],
                                            framework_lib: ["React.js", "Bootstrap", "TanStack Table"],
                                            tool_ide: ["VS Code", "Git"],
                                            methodology: ["Scrum", "Kanban", "GAMP5"],
                                        }}
                                        typeLineBreak={true}
                                    />

                                    <p className='mt-4'>
                                        Delivered reliable, well-structured code — initiative and quality confirmed in the reference letter.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                ),
            }
        },
    ];

    return (
        <>
            <h1>Timeline</h1>
            <VerticalTimeline animate={true}>
                {timelineItems.map((item, index) => (
                    <VerticalTimelineElement
                        key={index}
                        date={item.date}
                        dateClassName="date"
                        icon={
                            <div className='w-100 h-100 d-flex align-items-center justify-content-center'>
                                <span
                                    className="m-s-filled"
                                    style={{ fontSize: '2rem' }}
                                >{item.icon}</span>
                            </div>
                        }
                        iconStyle={item.iconStyle}
                    >
                        <h3 className="vertical-timeline-element-title">{item.title}</h3>
                        <h4 className="vertical-timeline-element-subtitle">{item.location}</h4>
                        <div>{item.content}</div>
                        {item.modal && (
                            <div className='w-100 d-flex justify-content-end align-items-center mt-3'>
                                <a href="#" className="link-secondary me-4 text-decoration-none d-flex align-items-center" onClick={(e) => handleOpenModal(e, item.modal)}>
                                    <span className="m-s-filled fs-5 me-1">tab_move</span> <span className="text-decoration-underline">more</span>
                                </a>
                            </div>
                        )}
                    </VerticalTimelineElement>
                ))}
            </VerticalTimeline>

            <BasicModal
                show={modalData.show || false}
                title={modalData.title}
                content={modalData.content}
                size={modalData.size}
                onClose={handleCloseModal}
            />
        </>
    );
};

export default CvTimeline;
