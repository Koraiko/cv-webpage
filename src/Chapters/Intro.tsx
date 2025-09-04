import * as React from 'react';
import "./Intro.css";
import { useEffect, useState } from 'react';

// TODO: Step n - Cleanup code
/**
 * - [ ] types/ interfaces into types folder
 * - [ ] Structure images in dedicated folder
 * - [ ] move hardcoded text into public folder (one location to edit without editing code in future)
 * - [ ] check uniform definition of variables (A_VARIABLE VS aVariable VS ...) => document this in README!
 * - [ ] check if JavaDoc style comments are used everywhere
 */
// TODO: Step n-1: limit screen width for very large screens (e.g. 4k) - otherwise layout breaks
// TODO: Step n-2: mobile view (some elements hide themself under certain width - e.g. footer => check if all mobile layouts are implemented)
// TODO: Step 1 - Move About me section to here
// TODO: Step 2 - make name be on application photo
// TODO: Step 3 - make images parallax on mouse move (optional)

// ========================================================================================
// TYPE DEFINITIONS
// ========================================================================================

interface ImageConfig {
    src: string;
    alt: string;
    objectPosition: string;
    useContain?: boolean;
}

interface GridSectionProps {
    children: React.ReactNode;
    className?: string;
    flex?: string;
    borderDirection?: 'top-bottom' | 'left' | 'right' | 'none';
    style?: React.CSSProperties;
}

interface AboutMeData {
    title: string;
    subTitle: string;
    content: string[];
    footer: string;
    tags?: { icon: string; text: string }[];
}

// ========================================================================================
// CONSTANTS & CONFIGURATION
// ========================================================================================

/** CSS class constants for consistent styling */
const STYLES = {
    LAYOUT: {
        FULL_ROW: "m-0 row d-flex justify-content-between w-100 h-100",
        FULL_COLUMN: "d-flex flex-column h-100",
        CONTAINER: "p-0 h-100",
    },
    BORDERS: {
        TOP_BOTTOM: "border-top border-bottom border-5 p-0",
        LEFT: "border-start border-5 p-0",
        RIGHT: "border-end border-5 p-0",
    },
    IMAGE: {
        FULL_SIZE: "w-100 h-100",
    }
} as const;


/** Image configuration with semantic naming */
const IMAGE_CONFIG: Record<string, ImageConfig> = {
    TOP_LEFT: {
        // Foto von Christian Wiediger auf Unsplash
        src: "/img/rahul-mishra-unsplash.jpg",
        alt: "React code",
        objectPosition: "center bottom",
    },
    TOP_RIGHT: {
        src: "/img/kanban-selfMade.png",
        alt: "a Kanban board with issues in different columns",
        objectPosition: "center top",
    },
    CENTER_LEFT: {
        src: "/img/2024-Application-photoscape.jpg",
        alt: "Professional application photo of Sarah Marek (2024)",    // TODO: change to new one
        objectPosition: "72% 23%",
    },
    CENTER_RIGHT: {
        src: "/img/graduationCeremonyInstagram.jpg",
        alt: "University of Ulm graduation ceremony photo",
        objectPosition: "45% center",
    },
    BOTTOM_LEFT: {
        src: "/img/todo-notes-selfMade.jpg",
        alt: "daily and weekly todo notes on table with black pen",
        objectPosition: "center 40%",
    },
    BOTTOM_CENTER: {
        // Foto von <a href="https://unsplash.com/de/@asthetik?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Mike Kenneally</a> auf <a href="https://unsplash.com/de/fotos/kaffeebohnen-lot-TD4DBagg2wE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
        src: "/img/mike-kenneally-unsplash.jpg",
        alt: "Coffe beans texture",
        objectPosition: "center center",
    },
    BOTTOM_RIGHT: {
        // Foto von <a href="https://unsplash.com/de/@daniellezuch?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Daniel Leżuch</a> auf <a href="https://unsplash.com/de/fotos/eine-tastatur-mit-einer-maus-iN9grM085Rg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
        src: "/img/daniel-lezuch-unsplash.jpg",
        alt: "laptop keyboard; cinematic shot from above",
        objectPosition: "center 30%",
    },
} as const;

// ========================================================================================
// UTILITY FUNCTIONS
// ========================================================================================

/** Get border CSS class based on direction */
function getBorderClass(direction: GridSectionProps['borderDirection']): string {
    switch (direction) {
        case 'top-bottom': return STYLES.BORDERS.TOP_BOTTOM;
        case 'left': return STYLES.BORDERS.LEFT;
        case 'right': return STYLES.BORDERS.RIGHT;
        default: return '';
    }
}

/** Create common section style with height constraint and overflow handling */
function createSectionStyle(height: string): React.CSSProperties {
    return {
        height,
        minHeight: 0,
        overflow: 'hidden',
    };
}

/**
 * Introduction page component featuring a responsive image collage layout
 * 
 * Layout structure:
 * - Top row (1/6 vh): Two images showing bottom portions
 * - Main section (4/6 vh): Two images + introduction text  
 * - Bottom row (1/6 vh): Three images showing top portions
 * 
 * @returns Responsive introduction section with image collage and text
 */
const Intro: React.FC = () => {
    const [aboutMe, setAboutMe] = useState<AboutMeData | null>(null);
    /** Viewport height fractions for consistent layout */
    const VIEWPORT_HEIGHTS = {
        TOP_BOTTOM_SECTION: 'calc(100vh / 6)',
        MAIN_SECTION: 'calc(100vh * 4 / 6)',
    } as const;


    /** 
     * Optimized image component with consistent styling
     * Uses object-fit: cover by default for full container coverage
     */
    const ImageCollage: React.FC<{
        config: ImageConfig;
        containerClass?: string;
    }> = ({ config, containerClass = "col" }) => {
        const { src, alt, objectPosition, useContain = false } = config;

        const imageStyle: React.CSSProperties = {
            width: '100%',
            height: '100%',
            objectFit: useContain ? 'contain' : 'cover',
            objectPosition,
        };

        return (
            <div className={`${STYLES.LAYOUT.CONTAINER} ${containerClass}`}>
                <img
                    src={src}
                    alt={alt}
                    style={imageStyle}
                    className={useContain ? STYLES.IMAGE.FULL_SIZE : ""}
                />
            </div>
        );
    };

    /** 
     * Flexible grid section with configurable borders and layout
     */
    const GridSection: React.FC<GridSectionProps> = ({
        children,
        className = "",
        flex,
        borderDirection = 'none',
        style: propStyle
    }) => {
        const borderClass = getBorderClass(borderDirection);
        const flexStyle = flex ? { flex } : undefined;
        const combinedStyle = { ...flexStyle, ...propStyle };
        const combinedClassName = `${STYLES.LAYOUT.FULL_ROW} ${borderClass} ${className}`.trim();

        return (
            <div className={combinedClassName} style={combinedStyle}>
                {children}
            </div>
        );
    };

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
        <div
            className={`w-100 ${STYLES.LAYOUT.FULL_COLUMN}`}
            style={{ height: '100vh' }}
        >
            {/* Top row - 1/6 of viewport height */}
            <GridSection
                flex="1"
                className="flex-shrink-0"
                style={createSectionStyle(VIEWPORT_HEIGHTS.TOP_BOTTOM_SECTION)}
            >
                <ImageCollage
                    config={IMAGE_CONFIG.TOP_LEFT}
                    containerClass={`col-4 ${STYLES.BORDERS.RIGHT}`}
                />
                <ImageCollage
                    config={IMAGE_CONFIG.TOP_RIGHT}
                    containerClass="col-8"
                />
            </GridSection>

            {/* Main content section - 4/6 of viewport height */}
            <GridSection
                flex="4"
                borderDirection="top-bottom"
                className="flex-shrink-0"
                style={createSectionStyle(VIEWPORT_HEIGHTS.MAIN_SECTION)}
            >
                <ImageCollage
                    config={IMAGE_CONFIG.CENTER_LEFT}
                    containerClass={`col-4 ${STYLES.BORDERS.RIGHT} h-100`}
                />

                {/* Introduction text column */}
                <div className="col-4 d-flex flex-column justify-content-center p-4">
                    <h1 className='righteous-regular d-flex align-content-center'><span className="m-s-filled px-2">frame_person</span>{aboutMe?.title}</h1>
                    <div className="mx-2 px-2 mb-3">
                    {aboutMe?.content.map((paragraph: string, index: number) => (
                        <p key={index} className={index === 0 ? '' : 'mt-2'}>
                            {paragraph}
                        </p>
                    ))}
                    <i className="w-100 fc-teal align-self-center">{aboutMe?.footer}</i>
                    </div>
                </div>

                <ImageCollage
                    config={IMAGE_CONFIG.CENTER_RIGHT}
                    containerClass={`col-4 ${STYLES.BORDERS.LEFT} h-100`}
                />
            </GridSection>

            {/* Bottom row - 1/6 of viewport height */}
            <GridSection
                flex="1"
                className="flex-shrink-0"
                style={createSectionStyle(VIEWPORT_HEIGHTS.TOP_BOTTOM_SECTION)}
            >
                <ImageCollage
                    config={IMAGE_CONFIG.BOTTOM_LEFT}
                    containerClass={`col-3 ${STYLES.BORDERS.RIGHT}`}
                />
                <ImageCollage
                    config={IMAGE_CONFIG.BOTTOM_CENTER}
                    containerClass={`col-4 ${STYLES.BORDERS.RIGHT}`}
                />
                <ImageCollage
                    config={IMAGE_CONFIG.BOTTOM_RIGHT}
                    containerClass="col-5"
                />
            </GridSection>
        </div>
    );
};

export default Intro;
