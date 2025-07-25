import React, { Component } from 'react';
import ImageCarousel from '../../shared/ImageCarousel';
import ButtonLabel from '../../shared/Labels/ButtonLabel';

interface AboutMeData {
    title: string;
    subTitle: string;
    content: string[];
    footer: string;
    tags?: { icon: string; text: string }[];
}

interface AboutMeState {
    aboutMe: AboutMeData | null;
}

class AboutMe extends Component<{}, AboutMeState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            aboutMe: null
        };
    }

    async componentDidMount() {
        try {
            const response = await fetch('/content/aboutMe.json');
            const data = await response.json();
            this.setState({ aboutMe: data });
        } catch (error) {
            console.error('Error loading about me data:', error);
        }
    }
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
                                    roundedImg={true}
                                />
                            </div>
                            {/* right side (intro text) */}
                            <div className='col-lg-6 d-flex p-5'>
                                <div>
                                    <h1>Hi, I'm <i className='shadows-into-light-two-regular fc-rich-black'>Sarah Marek</i></h1><br />
                                    <span className="w-100 fw-bold fc-cambridge-blue align-self-center">{this.state.aboutMe?.subTitle}</span>
                                    {this.state.aboutMe?.content.map((paragraph, index) => (
                                        <p key={index} className={index === 0 ? '' : 'mt-4'}>
                                            {paragraph}
                                        </p>
                                    ))}
                                    <i className="w-100 fc-teal align-self-center">{this.state.aboutMe?.footer}</i>
                                </div>
                            </div>
                        </div>
                    </div>
                    {(this.state.aboutMe?.tags || []).length > 0 ? (
                        <>
                            <hr className='border-3 border-teal' />
                            <div className='d-flex justify-content-center w-100 flex-wrap'>
                                {this.state.aboutMe?.tags?.map((tag, index) => (
                                    <ButtonLabel key={index} className='bg-cambridge-blue'>
                                        <span className={`m-s-filled pe-2 fs-4`}>{tag.icon}</span>
                                        {tag.text}
                                    </ButtonLabel>
                                ))}
                            </div>
                        </>) : null}
                </div>
            </div>
        );
    }
}

export default AboutMe;
