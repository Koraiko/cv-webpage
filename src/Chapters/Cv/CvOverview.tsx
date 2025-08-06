import React, { ReactElement } from 'react';
import {
  ReactOriginal, AngularOriginal, JavascriptOriginal, TypescriptOriginal,
  Css3Original, Html5Original, JavaOriginal, VscodeOriginal, GitOriginal, NpmOriginalWordmark, EslintOriginal,
  ChromeOriginal
} from 'devicons-react';

interface SectionInfo {
  title: string;
  content: {
    name: string;
    icon: ReactElement<any, any>;
  }[];
  className?: string;
}
const iconSize = '60';
const containerSize = parseInt(iconSize) + 40; // Add more padding for card padding
const items: SectionInfo[] = [
  {
    'title': 'Frontend',
    'content': [{
      name: 'JavaScript',
      icon: <JavascriptOriginal size={iconSize} />,
    }, {
      name: 'TypeScript',
      icon: <TypescriptOriginal size={iconSize} />,
    }, {
      name: 'HTML',
      icon: <Html5Original size={iconSize} />,
    }, {
      name: 'CSS',
      icon: <Css3Original size={iconSize} />,
    }, {
      name: 'Angular',
      icon: <AngularOriginal size={iconSize} />,
    }, {
      name: 'React',
      icon: <ReactOriginal size={iconSize} />,
    }],
    className: 'bg-cambridge-blue'
  },
  {
    'title': 'Backend',
    'content': [{
      name: 'Java',
      icon: <JavaOriginal size={iconSize} />,
    }],
    className: 'bg-teal'
  },
  {
    'title': 'Tools',
    'content': [{
      name: 'VS Code',
      icon: <VscodeOriginal size={iconSize} />,
    }, {
      name: 'Git',
      icon: <GitOriginal size={iconSize} />,
    }, {
      name: 'npm',
      icon: <NpmOriginalWordmark size={iconSize} />,
    }, {
      name: 'ESLint',
      icon: <EslintOriginal size={iconSize} />,
    }, {
      name: 'Chrome DevTools',
      icon: <ChromeOriginal size={iconSize} />,
    }],
    className: 'bg-cambridge-blue'
  }
];

const CvOverview: React.FC = () => {
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  // CSS styles for flip animation
  // TODO: move to css file
  const flipStyles = `
    .tech-card-container:hover .tech-card {
      transform: rotateX(180deg);
    }
    
    .tech-card {
      width: 100%;
      height: 100%;
      position: relative;
      transform-style: preserve-3d;
      transition: transform 0.6s;
    }
    
    .tech-card-front,
    .tech-card-back {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      border-radius: 0.375rem;
    }
    
    .tech-card-back {
      transform: rotateX(180deg);
    }
  `;

  return (
    <div id="TechStackComponent">
      <style>{flipStyles}</style>
      <div className="vh-100 d-flex flex-row flex-nowrap overflow-hidden">
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={index}
              className={`d-flex flex-column justify-content-start align-items-center p-4 ${item.className} ${isActive ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
              style={{ flex: '0 0 33.33%' }}
            >
              <h2 className="text-center righteous-regular">{item.title}</h2>
              <div
                className={`d-flex flex-wrap p-4 ${item.className} ${isActive ? 'active' : ''}`}
              >
                {
                  item.content.map((skill, index) => (
                    <div
                      key={index}
                      className="tech-card-container m-1"
                      style={{ width: `${containerSize}px`, height: `${containerSize}px` }}
                    >
                      <div className="tech-card">
                        {/* Front side - Icon */}
                        <div className="tech-card-front d-flex justify-content-center align-items-center bg-white rounded p-2">
                          {skill.icon}
                        </div>
                        {/* Back side - Name */}
                        <div className="tech-card-back d-flex justify-content-center align-items-center bg-white rounded p-2">
                          <span className="fw-bold text-center">{skill.name}</span>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CvOverview;

