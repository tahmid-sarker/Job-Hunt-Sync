import Banner from "../../assets/Hero-Banner.svg";

const Hero = () => {
    return (
        <section className="w-11/12 md:min-h-screen mx-auto flex flex-col md:flex-row items-center justify-between gap-5 md:gap-0 mt-5">
            {/* Left - Title and Description */}
            <div className="w-full">
                <div className="w-10/12 mx-auto text-left">
                    <h1 className="text-2xl md:text-4xl font-bold text-gray-700 mb-2">
                        Find Your Next Big <span className="text-primary">Opportunity</span> with Job Hunt Sync
                    </h1>
                    <p className="text-base md:text-xl text-neutral">
                        Discover a world of job opportunities across trusted companies all in one place.
                        From remote roles to corporate careers, Job Hunt Sync keeps your job search focused and frictionless.
                    </p>
                </div>
            </div>
            {/* Right - Banner */}
            <div className="w-full">
                <img src={Banner} alt="Hero Banner" className="w-full h-auto object-contain" />
            </div>
        </section>
    );
};

export default Hero;