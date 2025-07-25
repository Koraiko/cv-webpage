import { JSX } from 'react/jsx-runtime';

interface ProgressBarBasicProps {
    /** Progress value as a percentage (0-100) */
    progress: number;
    /** Optional CSS class name for styling */
    classNameBackground?: string;
    classNameProgress?: string;
}

/**
 * Basic progress bar component with background track and progress fill.
 * 
 * @param progress - Progress value as a percentage (0-100)
 * @param classNameBackground - Background classes for the progress track
 * @param classNameProgress - Classes for the progress fill
 * @returns A styled progress bar with background track and progress fill
 */
const ProgressBarBasic = ({ 
    progress, 
    classNameBackground = '',
    classNameProgress = '',
}: ProgressBarBasicProps): JSX.Element => {
    // Ensure progress is within valid range
    const clampedProgress = Math.min(Math.max(progress, 0), 100);

    const containerStyle: React.CSSProperties = {
        position: 'relative',
        width: '100%',
        height: '5px',
        marginTop: '-1px',
    };

    const backgroundStyle: React.CSSProperties = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.5,
    };

    const progressStyle: React.CSSProperties = {
        position: 'absolute', // Change to absolute to overlay on background
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        transform: `scaleX(${clampedProgress / 100})`,
        transformOrigin: 'left',
        transition: 'transform 0.3s ease-out',
    };

    return (
        <div style={containerStyle}>
            {/* Background track with opacity */}
            <div
                className={`scroll-progress-bar w-100 ${classNameBackground}`}
                style={backgroundStyle}
            />
            {/* Progress fill with full opacity */}
            <div
                className={`scroll-progress-bar w-100 rounded ${classNameProgress}`}
                style={progressStyle}
            />
        </div>
    );
};

export default ProgressBarBasic;
