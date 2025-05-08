import { use } from "react";
import Companies from "../components/Home/Companies";
import Hero from "../components/Home/Hero";
import HowItWorks from "../components/Home/HowItWorks";
import Testimonials from "../components/Home/Testimonials";
import WhyChooseUs from "../components/Home/WhyChooseUs";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
    const {user} = use(AuthContext)
    console.log(user)
    return (
        <div>
            {/*Hero Section*/}
            <Hero></Hero>
            {/*How It Works Section*/}
            <HowItWorks></HowItWorks>
            {/*Why Choose Us Section*/}
            <WhyChooseUs></WhyChooseUs>
            {/*Companies Section*/}
            <Companies></Companies>
            {/*Testimonials Section*/}
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;