import 'react-vertical-timeline-component/style.min.css';
import "./Footer.css";
import ProgressBar from './ProgressBar';

export interface FooterItem {
    iconName: string;
    label: string;
    linkToId: string;
}
const Footer = (): React.ReactNode => {
    const footerHeight = '100px';

    const items: FooterItem[] = [
        {
            iconName: "frame_person",
            label: "About me",
            linkToId: "AboutMeComponent"
        },
        {
            iconName: "filter_alt",
            label: "Filter",
            linkToId: "FilterComponent"
        },
        {
            iconName: "lightbulb_2",
            label: "Tech Stack",
            linkToId: "TechStackComponent"
        },
        {
            iconName: "timeline",
            label: "Timeline",
            linkToId: "TimelineComponent"
        },
        {
            iconName: "id_card",
            label: "Contact",
            linkToId: "ContactComponent"
        },
    ];

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
     * scrolls to position of an element with a smooth animation
     * @param linkToId ID of the element to scroll to
     * @returns void
     */
    const handleItemClick = (linkToId: string) => {
        const element = document.getElementById(linkToId);
        if (!element) return;

        const start = window.pageYOffset;
        const target = element.offsetTop - 100;
        const distance = target - start;

        let progress = 0;

        const animate = () => {
            progress += 0.02; // Fixed step size

            if (progress >= 1) {
                window.scrollTo(0, target);
                return;
            }

            const ease = progress * (2 - progress);
            window.scrollTo(0, start + distance * ease);
            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    };

    return (
        <>
            {/* PC */}
            <div className={'position-sticky bottom-0 d-none d-sm-flex m-0'}>
                <footer
                    className={
                        'position-sticky bottom-0 w-100 ' +
                        'bg-light ' +
                        'm-0 px-0 ' +
                        'd-flex flex-column'
                    }
                    style={{ height: footerHeight, zIndex: 1000 }}
                >
                    <ProgressBar items={items} />
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
