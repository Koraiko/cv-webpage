import * as React from 'react';
import { useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { JSX } from 'react/jsx-runtime';
import BasicModal, { BasicModalType } from '../../shared/BasicModal';
import SkillLabel from '../../shared/Labels/SkillLabels';
import ImageCarousel from '../../shared/ImageCarousel';
import "./timeline.css";

interface TimelineItemIcon {
    icon: string,
    iconStyle: React.CSSProperties
}

interface TimelineItem extends TimelineItemIcon {
    date: string,
    title: string,
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
            content:
                <>

                    <ul>
                        <li>Supervised weekly "Computer Leisure Time" (2014–2017)</li>
                        <li>Designed yearbooks and one graduation booklet (2017–2018)</li>
                    </ul>
                </>,
            date: "2014 -- 2018",
            ...getIcon('Volunteer'),
        },
        {
            title: 'Abitur',
            content:
                <>General university entrance qualification with basic computer science.</>,
            date: "09.2010 -- 07.2018",
            ...getIcon('Education'),
        },
        {
            title: 'Volunteer at university',
            content:
                <>
                    <ul>
                        <li>Member of the computer science student council</li>
                        <li>Organized and supported university events</li>
                        <li>Held roles such as protocol secretary and office access manager</li>
                    </ul>
                </>,
            date: "10.2021 -- 06.2025",
            ...getIcon('Volunteer'),
        },
        {
            title: 'Bachelor of Science in Computer Science',
            content:
                <>
                    <ul>
                        <li>Specialized subjects: Web Engineering and IT-Security</li>
                        <li>Thesis on implementing coordination processes in a web-based, object-centric BPM tool (research project: PHILharmonicFlows)</li>
                    </ul>
                </>,
            date: "10.2018 -- 06.2025",
            ...getIcon('Education'),
        },
        {
            title: 'Frontend Developer at RehaCat+',
            content:
                <>
                    <ul>
                        <li>Refactored frontend, upgraded design system, and introduced TanStack Table</li>
                        <li>Member of an agile interdisciplinary team</li>
                    </ul>
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
        <div id="TimelineComponent">
            <div className='w-100 timeline d-pc-flex justify-content-center align-items-center mt-4'>
                <span className="badge rounded-pill bg-rich-black fc-white m-0 px-4"><h1>Timeline</h1></span>
            </div>
            <div className='mb-n1 mt-4 timeline d-mobile-flex' id="TimelineComponent">
                <span className="badge rounded-pill bg-rich-black fc-white m-0 pe-4 ps-5"
                    style={{ transform: 'translateX(-2rem)' }}><h1>Timeline</h1></span>
            </div>
            <VerticalTimeline>
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
                        intersectionObserverProps={{
                            threshold: 0.05,
                            triggerOnce: false,
                        }}
                    >
                        <h3 className="vertical-timeline-element-title mb-2">{item.title}</h3>
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
                <VerticalTimelineElement />
            </VerticalTimeline>
            {/* Interested-Element - PC */}
            <div className='w-100 timeline d-pc-flex bottom justify-content-center align-items-center mt-2 pt-1 pb-4'>
                <div className="circle circle-xl z-0 bg-cambridge-blue position-relative">
                    <div className="circle circle-md z-0 bg-teal" />
                    <div
                        className="circle circle-lg z-1 bg-ash-gray"
                        style={{ transform: 'translateX(120%)translateY(60%)' }}
                    />
                    <div className='position-absolute top-50 start-50 translate-middle text-center'>
                        <p className='m-0 fw-bold shadows-into-light-two-regular'
                            style={{
                                transform: 'translateX(-35%)translateY(10%)rotate(-30deg)',
                                fontSize: '5vw',
                            }}>Interested?</p>
                        <p className='m-0 fw-bold text-nowrap'
                            style={{
                                transform: 'translateX(15%)translateY(-165%)rotate(-30deg)',
                                fontSize: '2.4vw',
                            }}>I'm just a message away.</p>
                    </div>
                </div>
            </div>
            {/* Interested-Element - Mobile */}
            <div className='w-100 timeline d-mobile-flex mt-2 pt-1 pb-4'
                style={{ transform: 'translateY(-7rem)' }}
            >
                <div className="circle circle-xl position-relative"
                    style={{ transform: 'translateX(-40%)' }} >
                    <div
                        className="circle circle-lg z-0 bg-ash-gray"
                        style={{ transform: 'translateX(160%)translateY(80%)' }}
                    />
                    <div className="position-absolute w-100 h-100 bg-cambridge-blue z-1" style={{ borderRadius: '50%', overflow: 'hidden', top: 0, left: 0 }} />
                    <div
                        className="position-relative circle circle-md z-3 bg-teal"
                        style={{ transform: 'translateX(300%)translateY(-200%)' }}
                    />

                    <div className='position-absolute top-50 start-50 translate-middle text-center z-2'>
                        <h1 className='m-0 shadows-into-light-two-regular timeline'>Interested?</h1>
                        <h2 className='m-0 text-nowrap timeline'>I'm just a message away.</h2>
                    </div>
                </div>
            </div>


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
