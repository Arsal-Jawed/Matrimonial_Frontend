
function Fact2(){

    return(
        <div className="flex flex-col justify-center items-center mt-[8vh] md:mt-[24vh]">
            <p className="text-[6vw] md:text-[2.4vw] italic font-bold">Longevity and <span className="text-clr2">Well-Being</span></p>
            <div className="mt-[6vh] relative bg-fixed bg-cover bg-center p-[4vh] py-[10vh] md:p-[45vh] md:py-[22vh] flex justify-center items-center" 
            style={{ backgroundImage: `url('/Assets/marriage.jpg')` }}
            >
                <div className="absolute z-0 inset-0 bg-black bg-opacity-60"></div>
                <p className="text-white italic font-semibold text-[4vw] md:text-[1.4vw] z-10">
                "Marriage is associated with longer lifespans and better overall health. Studies show that married individuals tend to live longer, experience less stress, and enjoy greater emotional and physical well-being compared to their unmarried counterparts."
                </p>
            </div>
        </div>
    );
}

export default Fact2;