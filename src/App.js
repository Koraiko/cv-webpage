import './App.css';
import AboutMe from './Intro/AboutMe.tsx';
import CvOverview from './Cv/CvOverview.tsx';
import CvTimeline from './Cv/CvTimeline';
import ContactMe from './ContactMe/ContactMe.tsx';


function App() {
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
    </>
  );
}

export default App;
