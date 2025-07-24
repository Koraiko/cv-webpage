import React, { Component } from 'react';
import ImageCarousel from '../../shared/ImageCarousel';
import { hoursWorked } from '../../shared/variables';
import ButtonLabel from '../../shared/Labels/ButtonLabel';

class AboutMe extends Component {
    render(): React.ReactNode {
        const jobApplicationPhotos = [
            {
                path: "/img/2025-SSM.jpg",
                description: "2025"
            },
            {
                path: "/img/2024-SSM.jpg",
                description: "2024"
            },
        ];

        return (
            <div className="w-100 h-25 p-5" id="AboutMeComponent">
                {/* Box for intro */}
                <div className='w-100'>
                    <div className='container'>
                        <div className='row py-2'>
                            {/* left side (img carousel) */}
                            <div className='col-lg-6 d-flex justify-content-center align-items-center'>
                                <ImageCarousel
                                    imageArray={jobApplicationPhotos}
                                    id={"aboutMeCarousel"}
                                />
                            </div>
                            {/* right side (intro text) */}
                            <div className='col-lg-6 d-flex p-5'>
                                <div>
                                    <h1>Hi, I'm <i className='shadows-into-light-two-regular fc-rich-black'>Sarah Marek</i></h1><br />
                                    <span className="w-100 fw-bold fc-cambridge-blue align-self-center">- FRONTEND DEVELOPER - </span>
                                    <p>
                                        I'm a frontend developer with a focus on clean code, intuitive interfaces, and user-centered design. I enjoy working with modern tools like React and TypeScript and continuously aim to improve both user experience and code quality.
                                    </p>
                                    <p className="mt-4">
                                        My first attempts at HTML and CSS go back to high school — the results weren’t great, but the curiosity stuck. Since March 2023, I’ve been deepening my skills through university and personal projects using HTML, CSS, JavaScript, and TypeScript. Since October 2024, I’ve also been working with frameworks like React and Angular.
                                    </p>
                                    <p className="mt-4">
                                        I value clear structure, long-term maintainability, and learning from real-world challenges — whether through collaborative projects or by improving existing systems. I'm especially motivated by projects where well-structured code meets a strong UX focus.
                                    </p>
                                    <i className="w-100 fc-teal align-self-center">That first website? Thankfully, it never made it online.</i>
                                    {/*
                                    <ButtonLabel onClick={() => window.location.href="mailto:s.sabrina.marek@gmail.com"}>
                                        <span className="m-s-filled pe-2 fs-4">id_card</span> Contact me
                                    </ButtonLabel>
                                     */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className='border-3 border-teal'/>
                    <div className='d-flex justify-content-center w-100 flex-wrap'>
                        <ButtonLabel className='bg-cambridge-blue'>
                            <span className="m-s-filled pe-2 fs-4">work_history</span>
                            {hoursWorked}+ hours coding
                        </ButtonLabel>
                        <ButtonLabel className='bg-cambridge-blue'>
                            <span className="m-s-filled pe-2 fs-4">tabs</span>
                            20 tabs open
                        </ButtonLabel>
                    </div>
                </div>
            </div>
        );
    }
}

export default AboutMe;
