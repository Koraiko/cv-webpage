import * as React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { JSX } from 'react/jsx-runtime';

function getIcon ( type: 'Education' | 'Work' | 'Project' | 'Certificate' | 'Volunteer') : {icon: JSX.Element, style: React.CSSProperties} {
  switch (type) {
    case 'Education':
      return {
        icon: <span className="m-s-filled">school</span>,
        style: { 
          background: 'rgb(33, 150, 243)', 
          color: '#fff' 
        }
      };
    case 'Work':
      return {
        icon: <span className="m-s-filled">work</span>,
        style: { 
          background: 'rgb(33, 150, 243)', 
          color: '#fff' 
        }
      };
    case 'Project':
      return {
        icon: <span className="m-s-filled">code</span>,
        style: { 
          background: 'rgb(33, 150, 243)', 
          color: '#fff' 
        }
      };
    case 'Certificate':
      return {
        icon: <span className="m-s-filled">award_star</span>,
        style: { 
          background: 'rgb(33, 150, 243)', 
          color: '#fff' 
        }
      };
    case 'Volunteer':
      return {
        icon: <span className="m-s-filled">volunteer_activism</span>,
        style: { 
          background: 'rgb(33, 150, 243)', 
          color: '#fff' 
        }
      };
    default:
      return {
        icon: <span className="m-s-filled">info</span>,
        style: { 
          background: 'rgb(33, 150, 243)', 
          color: '#fff' 
        }
      };
  }
};

const CvTimeline = (): JSX.Element => {
  const timelineItems = [
    {
      title: 'Bachelor of Science in Computer Science',
      location: 'Ulm, Germany',
      content:
        <>description</>,
      date: "2018 -- 2025",
      icon: "school",
    },
    {
      title: 'Bachelor of Science in Computer Science',
      location: 'Ulm, Germany',
      content:
        <>description</>,
      date: "2018 -- 2025",
      icon: "school",
    },
  ];
  return (
    <>
      <h1>Timeline</h1>
      <VerticalTimeline>
        {timelineItems.map((item, index) => (
          <VerticalTimelineElement
            key={index}
            date={item.date}
            dateClassName="date"
            icon={<span className="m-s-filled">{item.icon}</span>}
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          >
            <h3 className="vertical-timeline-element-title">{item.title}</h3>
            <h4 className="vertical-timeline-element-subtitle">{item.location}</h4>
            <div>{item.content}</div>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </>
  );
};

export default CvTimeline;
