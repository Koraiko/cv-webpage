import './App.css';
import AboutMe from './Chapters/AboutMe/AboutMe.tsx';
import CvOverview from './Chapters/Cv/CvOverview';
import CvTimeline from './Chapters/Cv/CvTimeline';
import ContactMe from './Chapters/ContactMe/ContactMe';
import Footer from './Layout/Footer';


function App() {
  const inspirationCvPages = [{
    name: 'Aditya Seth',
    url: 'https://adityaseth.in/'
  },{
    name: "Dr. Aditya Kumar Gupta",
    url: 'https://aditya30051993.github.io/my-portfolio'
  },
  {
    name: 'Abhishek Ganvir (TODO: use this)',
    url: 'https://abhishekganvir.vercel.app/'
  },{
    name: 'Tajmirul',
    url: 'https://www.me.toinfinite.dev/'
  }];
  return (
    <>
      <div className="alert alert-danger alert-dismissible m-3 text-center" role="alert">
        <strong>Notice:</strong> This website is currently a work in progress. Please be aware that some npm vulnerabilities may be present and the code is not yet completed.
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      <AboutMe />
      <CvOverview />
      <CvTimeline />
      <ContactMe />
      <div>
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
      <Footer />
    </>
  );
}

export default App;
