import * as React from 'react';
import "./Intro.css";

// TODO: create own water image + update filter to work better (currently its an eyesore)
/*
 * - [ ] create own img (seamless, comic like)
 * - [ ] update filter (animate is a bit hard to look at)
 * - [ ] update Text in center (playfull css-animations?)
 * - [ ] optional: playful elements (drag and drop ball with physics, etc.)
 * - [ ] hover animation?
 * - [ ] Pure CSS drawer => fun stuff?
 * - [ ] Twinbru => more inspiration?
 * => if filter does not work, use gif image instead (Krita animation)
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
                    <filter id="turbulence" x="0" y="0" width="100%" height="100%">
                        <feTurbulence id="sea-filter" numOctaves="3" seed="2" baseFrequency="0.02 0.05"></feTurbulence>
                        <feDisplacementMap scale="20" in="SourceGraphic"></feDisplacementMap>
                        <animate xlinkHref="#sea-filter" attributeName="baseFrequency" dur="60s" keyTimes="0;0.5;1" values="0.02 0.06;0.04 0.08;0.02 0.06" repeatCount="indefinite"></animate>
                    </filter>
                </svg>
            </section>
        </>
    );
};

export default Intro;
