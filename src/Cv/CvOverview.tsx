import React from 'react';

interface SectionInfo {
  title: string;
  content: React.ReactNode;
  className?: string;
}

const items: SectionInfo[] = [
  {
    'title': 'Frontend',
    'content': (
      <div>
        <p>JavaScript, Typescript, HTML, CSS</p>
        <p>Angular, React</p>
      </div>
    ),
    className: 'bg-cambridge-blue'
  },
  {
    'title': 'Backend',
    'content': (
      <div>
        <p>Java</p>
      </div>
    ),
    className: 'bg-teal'
  },
  {
    'title': 'Tools',
    'content': (
      <div>
        <p>VS Code, Git</p>
        <p>npm, ESLint</p>
        <p>Chrome DevTools</p>
      </div>
    ),
    className: 'bg-rich-black text-white'
  }
];

const CvOverview: React.FC = () => {
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  return (
    <div className="mx-5 px-5" style={{ height: '25vh' }}>
      <div className="d-flex flex-row flex-nowrap overflow-hidden h-100">
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <article
              key={index}
              className={"d-flex px-2 py-3 " + item.className + (isActive ? " w-100" : " flex-shrink-1")}
              style={{
                transition: 'width 0.3s ease',
                cursor: 'pointer'
              }}
              onClick={(e) => {
                setActiveIndex(index);
                console.debug(`Clicked on ${index}`);
              }}
            >
              <div className={"h-100 d-flex "}>
                  <div className="d-flex align-items-center justify-content-center" style={{ minWidth: '100px' }}>
                    <h2 style={{ transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>
                      {item.title}
                    </h2>
                  </div>
                  
                  {/* Content - only visible when active */}
                  {isActive && (
                    <div className="flex-grow-1 p-3 overflow-auto">
                      {item.content}
                    </div>
                  )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default CvOverview;

