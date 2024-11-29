import React, { useEffect, useState } from 'react';
import { Titlebar, ChatHistory, ProposalHistory } from '../Components';
import '../Styles/HeartAnimation.css';

function Heart(props) {
    return (
        <div className="heart" id={props.pid} style={props.styles}>
            <div className="heart-inner"></div>
        </div>
    );
}

function Particle({ pid, delay }) {
    const [position, setPosition] = useState({
        left: Math.floor(Math.random() * (window.innerWidth - 30 * 3.5 + 1)) + "px",
        top: Math.floor(Math.random() * (window.innerHeight - 30 * 3.5 + 1)) + "px"
    });

    useEffect(() => {
        const el = document.getElementById(pid);
        el.style.display = "block";
        el.style.animationDelay = delay;

        const handleAnimationEnd = () => {
            setPosition({
                left: Math.floor(Math.random() * (window.innerWidth - 30 * 3.5 + 1)) + "px",
                top: Math.floor(Math.random() * (window.innerHeight - 30 * 3.5 + 1)) + "px"
            });
        };

        el.addEventListener('animationiteration', handleAnimationEnd, false);

        return () => {
            el.removeEventListener('animationiteration', handleAnimationEnd);
        };
    }, [pid, delay]);

    return <Heart pid={pid} styles={position} />;
}

function generateStartTime() {
    return Math.floor(Math.random() * 701);
}

function HeartAnimation() {
    let items = [],
        delayFactorI = 2000,
        delayFactorD = 800;

    for (let i = 0; i < 10; i++) {
        if (i % 2 === 0) items[i] = delayFactorI + generateStartTime() + "ms";
        else items[i] = delayFactorD - generateStartTime() + "ms";
    }

    items = items.map((item, index) => {
        let pid = `h-${index}`;
        return <Particle key={pid} pid={pid} delay={item} />;
    });

    return <div id="root">{items}</div>;
}

function History() {
    return (
        <div className="flex flex-col items-center">
            <Titlebar />
            <div className='flex flex-row justify-center items-start p-[3vh] w-[100vw] h-[90vh] absolute inset-0 top-[10vh] z-0 bg-cover bg-center gap-[6vw]'
                style={{ backgroundImage: `url('/history.jpg')` }}>
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                <ChatHistory />
                <ProposalHistory />
            </div>
            <HeartAnimation />
        </div>
    );
}

export default History;
