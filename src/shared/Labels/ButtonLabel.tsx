import React from 'react';

const ButtonLabel: React.FC<{ 
    children: React.ReactNode,
    style?: React.CSSProperties,
    onClick?: () => void,
    className?: string
}> = ({ children, style, onClick, className="" }) => {

    return (
        <span 
        className={'btn '+ (onClick ? " btn-primary" : " btn-primary disabledButton") +' d-inline-flex justify-content-center align-items-center rounded py-2 px-3 m-1 ' + className} 
        style={{
            cursor: onClick ? 'pointer' : 'default',
            ...style
        }}
        onClick={onClick}
        >
            {children}
        </span>
    );
};

export default ButtonLabel;
