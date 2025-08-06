import React, { useState, useEffect } from 'react';
import ButtonLabel from '../../shared/Labels/ButtonLabel';

interface AboutMeData {
    title: string;
    subTitle: string;
    content: string[];
    footer: string;
    tags?: { icon: string; text: string }[];
}

// TODO: new img (greenscreen + business outfit) + let others judge text
const AboutMe = () => {
    const [aboutMe, setAboutMe] = useState<AboutMeData | null>(null);

    useEffect(() => {
        const loadAboutMeData = async () => {
            try {
                const response = await fetch('/content/aboutMe.json');
                const data = await response.json();
                setAboutMe(data);
            } catch (error) {
                console.error('Error loading about me data:', error);
            }
        };

        loadAboutMeData();
    }, []);

    return (
        <div id="AboutMeComponent" className='vw-100 vh-100 d-flex justify-content-center align-items-center'>
                <div className='container w-100'>
                    <div className='row d-flex justify-content-evenly py-2'>
                        {/* img */}
                        <div className='col-lg-6 d-flex justify-content-center align-items-center mt-4'>
                            <img src="/img/2024-SSM-cutout.png" alt="marek-2024" className="img-fluid" style={{ maxHeight: '80vh', maxWidth: '100%'}}/>
                        </div>
                        {/* text */}
                        <div className='col-lg-6 d-flex align-items-center p-5'>
                            <div>
                                {/*<h1>Hi, I'm <i className='shadows-into-light-two-regular fc-rich-black'>Sarah Marek</i></h1><br />
                                <span className="w-100 fw-bold fc-cambridge-blue align-self-center">{aboutMe?.subTitle}</span>*/}
                                <h1>{aboutMe?.title}</h1>
                                {aboutMe?.content.map((paragraph: string, index: number) => (
                                    <p key={index} className={index === 0 ? '' : 'mt-4'}>
                                        {paragraph}
                                    </p>
                                ))}
                                <i className="w-100 fc-teal align-self-center">{aboutMe?.footer}</i>
                            </div>
                        </div>
                    </div>
                </div>
                {(aboutMe?.tags || []).length > 0 ? (
                    <>
                        <hr className='border-3 border-teal' />
                        <div className='d-flex justify-content-center w-100 flex-wrap'>
                            {aboutMe?.tags?.map((tag: { icon: string; text: string }, index: number) => (
                                <ButtonLabel key={index} className='bg-cambridge-blue'>
                                    <span className={`m-s-filled pe-2 fs-4`}>{tag.icon}</span>
                                    {tag.text}
                                </ButtonLabel>
                            ))}
                        </div>
                    </>) : null}
        </div>
    );
}

export default AboutMe;
