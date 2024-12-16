import offer from "../assets/banner2.png";

function Offers() {
    return (
        <div className="w-screen h-screen relative bg-gradient-to-b from-blue-500 via-blue-100 to-blue-500">
            <img
                src={offer}
                alt="Special Offer Banner"
                className="hidden sm:block absolute top-0 left-0 w-full h-full"
                aria-hidden="true"
            />

            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-900/50 via-blue-500/30 to-blue-900/50"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
            
                <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
                    Limited Time Offers!
                </h1>
                <p className="text-lg md:text-xl mt-4 drop-shadow-md max-w-2xl">
                    Discover amazing discounts and deals just for you. Stay tuned for the launch!
                </p>
                <div className="mt-8 px-6 py-3 bg-blue-800 rounded-lg shadow-lg text-sm uppercase tracking-widest">
                    Available Soon
                </div>
            </div>
        </div>
    );
}

export default Offers;
