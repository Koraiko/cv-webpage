import React from 'react';

const Inspiration = () => {
    const inspirationCvPages = [{
        name: 'Aditya Seth',
        url: 'https://adityaseth.in/'
    }, {
        name: "Dr. Aditya Kumar Gupta",
        url: 'https://aditya30051993.github.io/my-portfolio'
    },
    {
        name: 'Abhishek Ganvir (TODO: use this)',
        url: 'https://abhishekganvir.vercel.app/'
    }, {
        name: 'Tajmirul',
        url: 'https://www.me.toinfinite.dev/'
    }];

    return (
        <>
            <div className="fade-item">
                Designed & Developed by me<br />
                Inspirations:

                <ul>
                    {inspirationCvPages.map((inspiration, index) => (
                        <li key={index}>
                            <a href={inspiration.url} target="_blank" rel="noopener noreferrer">{inspiration.name}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Inspiration;
