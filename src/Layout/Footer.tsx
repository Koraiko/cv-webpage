import 'react-vertical-timeline-component/style.min.css';
import { JSX } from 'react/jsx-runtime';

interface FooterItem {
    iconName: string;
    label: string;
    linkToId: string;
}
const Footer = (): JSX.Element => {
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
                            'm-2 h-100 '    // margin and height to look nice
                        }
                        onClick={() => handleItemClick(item.linkToId)}
                    >
                        <span className="m-s-filled fs-2">{item.iconName}</span><br />
                        <p className='text-nowrap'>{item.label}</p>
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
        const duration = 800;
        
        let startTime: number | null = null;
        
        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            const ease = progress * (2 - progress);
            window.scrollTo(0, start + distance * ease);
            
            if (progress < 1) requestAnimationFrame(animate);
        };
        
        requestAnimationFrame(animate);
    };

    return (
        <>
            {/* box to prevent overlaying normal page */}
            <div className={'d-none d-sm-block'} style={{ height: footerHeight }} />
            {/* PC-Footer */}
            <footer
                className={
                    'position-fixed bottom-0 w-100 ' +   // bottom position on view + full width
                    'alert alert-light m-0 ' +   // light background
                    'py-3 ' +    // padding on y-axis(left/right)
                    'd-flex justify-content-around align-items-center flex-nowrap ' +   // child content layout
                    'd-none d-sm-flex' // hide on mobile
                }
                style={{ height: footerHeight }}
            >
                {renderFooterItems(items)}
            </footer>
            {/* TODO: Mobile-Footer */}
        </>
    );
};

export default Footer;
