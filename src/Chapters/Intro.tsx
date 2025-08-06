import * as React from 'react';
import "./Intro.css";

// TODO: create own water image + update filter to work better (currently its an eyesore)
/*
 * - [ ] create own img
 * - [ ] update filter
 * - [ ] update Text in center (playfull css-animations?)
 * - [ ] optional: playful elements (drag and drop ball with physics, etc.)
 */

/**
 * Intro section with a fun water effect background.
 * @returns Scroll-Page for the introduction of the webpage.
 * @description This section features a water effect background with my name
 */
const Intro = (): React.ReactNode => {
    return (
        <>
          <section className="water-effect">
            <h1 className='intro'>Hi, I'm Sarah Marek</h1>
            <div className="water"></div>
            <svg>
                <filter
                    id="turbulence"
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    >
                        <feTurbulence
                            id="water-filter"
                            numOctaves="1" />
                        <feDisplacementMap
                            scale="10"
                            in="SourceGraphic" />
                        <animate
                            xlinkHref="#water-filter"
                            attributeName="baseFrequency"
                            dur="30s"
                            keyTimes={"0;1"}
                            values='0.03; 0.06'
                            repeatCount={"indefinite"} />
                </filter>
            </svg>
          </section>
        </>
    );
};

export default Intro;
