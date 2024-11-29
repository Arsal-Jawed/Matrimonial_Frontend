import { Titlebar, GuruForm, LoyaltyForm } from '../Components';
import { GiDiamonds } from 'react-icons/gi';
import { useEffect, useState } from 'react';
import '../Styles/guru.css';

const icons = [GiDiamonds];

function StarsAnimation() {
    const [elements, setElements] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const RandomIcon = icons[Math.floor(Math.random() * icons.length)];
            const newElement = {
                id: Math.random(),
                Icon: RandomIcon,
                size: Math.random() * 20 + 20,
                left: Math.random() * 100,
                top: Math.random() * 100,
            };
            setElements((prevElements) => [...prevElements, newElement]);

            setTimeout(() => {
                setElements((prevElements) => prevElements.filter((el) => el.id !== newElement.id));
            }, 3000);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden z-10 pointer-events-none">
            {elements.map(({ id, Icon, size, left, top }) => (
                <Icon
                    key={id}
                    className="absolute shine-animation"
                    style={{
                        left: `${left}%`,
                        top: `${top}%`,
                        fontSize: `${size}px`,
                        color: "silver"
                    }}
                />
            ))}
        </div>
    );
}

function LoveGuru() {
    return (
        <div className="relative flex flex-col justify-center w-[100vw]">
            <Titlebar />
            <div
                className="flex flex-row w-[100vw] h-[90vh] justify-between absolute inset-0 top-[10vh] z-0 bg-cover bg-center"
                style={{ backgroundImage: `url('/Guru.jpg')` }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <GuruForm />
                <LoyaltyForm />
                <StarsAnimation />
            </div>
        </div>
    );
}

export default LoveGuru;
