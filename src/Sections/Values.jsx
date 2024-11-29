import { useInView } from 'react-intersection-observer'; // Import the hook

function Values() {
    const values = [
        { text: "We strive for excellence in everything we do.", img: "/Assets/excellence.jpg" },
        { text: "Innovative solutions to meet your needs.", img: "/Assets/innovation.jpg" },
        { text: "Your satisfaction is our top priority.", img: "/Assets/satisfaction.jpg" }
    ];

    const { ref, inView } = useInView({ // Use the hook to track visibility
        triggerOnce: true, // Run the animation only once
        threshold: 0.2 // Trigger animation when 20% of the element is visible
    });

    return (
        <div
            ref={ref}
            className={`flex flex-col mt-[8vh] md:mt-36 justify-center items-center transition-all duration-1000 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
            <p className="text-4xl font-semibold mb-4">
                Our <span className="text-clr2">Values</span>
            </p>
            <p className="text-clr2 text-[3.2vw] md:text-[1.4vw] mb-16">
                We believe in providing the best services to our clients.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
                {values.map((value, index) => (
                    <div
                        key={index}
                        className="relative w-80 h-70 md:h-96 rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105"
                    >
                        <img
                            src={value.img}
                            alt={value.text}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                            <p className="text-white text-[4.6vw] md:text-[1.8vw] font-medium text-center px-4">
                                {value.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Values;
