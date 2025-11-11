import 'react-vertical-timeline-component/style.min.css';
import "./Footer.css";
import ProgressBar from './ProgressBar';
import { useState, useEffect } from 'react';

export interface FooterItem {
    iconName: string;
    label: string;
    linkToId: string;
}

// TODO: P50 - fix gsap removal making problems

interface FooterProps {
    onNavigate: (pageIndex: number) => void;
    pages: JSX.Element[];
    currentPageIndex: number;
}

// todo: make this automatic or move to parent component (pages?)
const allItems: FooterItem[] = [
    {
        iconName: "frame_person",
        label: "About me",
        linkToId: "Intro"
    },
    {
        iconName: "filter_alt",
        label: "CV Overview",
        linkToId: "CvOverview"
    },
    {
        iconName: "timeline",
        label: "Timeline",
        linkToId: "CvTimeline"
    },
    {
        iconName: "id_card",
        label: "Contact",
        linkToId: "ContactMe"
    },
    {
        iconName: "lightbulb_2",
        label: "Inspiration",
        linkToId: "Inspiration"
    },
];

const Footer = ({ onNavigate, pages, currentPageIndex }: FooterProps) : JSX.Element => {
    const footerHeight = '100px';
    const [items, setItems] = useState<FooterItem[]>([]);

    // Filter items based on available pages
    useEffect(() => {
        const filterAvailableItems = () => {
            const availableItems = allItems.filter(item => {
                return pages.some(page => {
                    const componentName = typeof page.type === 'string' ? page.type : page.type.name;
                    return componentName === item.linkToId;
                });
            });
            setItems(availableItems);
        };

        filterAvailableItems();
    }, [pages]);
    /**
     * Renders the footer items.
     * @param itemsArray Array of footer items to render
     * @returns React nodes representing all footer items
     */
    function renderFooterItems(itemsArray: FooterItem[]): React.ReactNode {
        if (!itemsArray || itemsArray.length === 0) return null;
        return (
            <>
                {itemsArray.map((item, index) => (
                    <div
                        key={index}
                        className={
                            'd-flex flex-column align-items-center justify-content-center ' +   // child behaviour
                            'h-100 '    // margin and height to look nice
                        }
                        onClick={() => handleItemClick(item.linkToId)}
                    >
                        <span className="m-s-filled fs-2">{item.iconName}</span>
                        <p className='text-nowrap m-0 pb-2'>{item.label}</p>
                    </div>
                ))}
            </>
        );
    }

    /**
     * Navigates to the page corresponding to the clicked footer item
     * @param linkToId ID of the component to navigate to
     * @returns void
     */
    const handleItemClick = (linkToId: string) => {
        const pageIndex = pages.findIndex(page => {
            const componentName = typeof page.type === 'string' ? page.type : page.type.name;
            return componentName === linkToId;
        });
        
        if (pageIndex !== -1) {
            onNavigate(pageIndex);
        }
    };

    return (
        <>
            {/* PC */}
            <div className={'position-sticky bottom-0 d-none d-sm-flex m-0'}>
                <footer
                    className={
                        'w-100 ' +
                        'm-0 px-0 ' +
                        'd-flex flex-column'
                    }
                    style={{ height: footerHeight, zIndex: 1000, backgroundColor: "white" }}
                >
                    <ProgressBar items={items} currentPageIndex={currentPageIndex} pages={pages} />
                    <div className='w-100 d-flex justify-content-around align-items-center flex-nowrap m-0' style={{ height: footerHeight }}>
                        {renderFooterItems(items)}
                    </div>
                </footer>
            </div>
            {/* Mobile */}
        </>
    );
};

export default Footer;
