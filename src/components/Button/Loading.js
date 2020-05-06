import React from 'react';

function Loading(props) {

    const {className = 'loading'} = props;

    return (
        <>
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                xmlnsXlink="http://www.w3.org/1999/xlink" 
                style={{ margin: 'auto', background: 'transparent', display: 'block' }} 
                width="20px" height="20px" 
                viewBox="0 0 100 100" 
                preserveAspectRatio="xMidYMid"
                className={typeof className === 'string' ? className : ''}
            >
                <g transform="rotate(30.2288 50 50)">
                    <path d="M50 15A35 35 0 1 0 74.74873734152916 25.251262658470843" fill="none" stroke="#fff" strokeWidth={12} />
                    <path d="M49 3L49 27L61 15L49 3" fill="#e15b64" />
                    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1" />
                </g>
            </svg>
        </>
    );
}

export default Loading;