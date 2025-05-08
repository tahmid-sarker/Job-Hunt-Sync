import { use, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

const Companies = () => {
    const companies = use(DataContext);
    const { user } = use(AuthContext);
    const [isViewAll, setIsViewAll] = useState(false);
    const navigate = useNavigate();

    const displayedCompanies = isViewAll ? companies : companies.slice(0, 4);

    const handleViewDetails = (company) => {
        if(!user) {
            navigate("/login")
        } else {
            navigate(`/company-details/${company.id}`)
        }
    }

    return (
        <section className="w-11/12 mx-auto mt-5">
            {/* Title */}
            <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-700 mb-5">
                Top <span className="text-primary">Companies</span> Hiring Now
            </h1>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayedCompanies.map((company, index) => (
                    <motion.div key={index} className="bg-white shadow-md hover:shadow-xl rounded-2xl overflow-hidden p-6 flex flex-col items-center transition-all duration-300 transform hover:scale-105"
                        variants={cardVariant} initial="hidden" whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: index * 0.15 }}>
                        
                        <img src={company.logo} alt={company.name} className="w-20 h-20 object-contain mb-4 rounded-full border border-secondary p-2"/>
                        <h3 className="text-xl font-semibold text-gray-700 mb-1 text-center">{company.name}</h3>
                        
                        <span className="text-primary text-xs font-semibold px-3 py-1 rounded-full mb-2 border border-secondary">
                            {company.industry}
                        </span>

                        <p className="text-sm text-gray-500 mb-1 text-center">{company.location}</p>
                        <p className="text-sm text-secondary font-semibold mb-4 text-center">
                            {company.jobs.length} Job{company.jobs.length !== 1 ? "s" : ""}
                        </p>

                        <button className="btn btn-primary hover:btn-secondary text-white cursor-pointer rounded-full"
                            onClick={() => handleViewDetails(company)}>
                            {user ? "View Details" : "Login to View Details"}
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* Toggle Button */}
            <div className="text-center mt-10">
                <button onClick={() => setIsViewAll(!isViewAll)}
                    className="btn btn-primary hover:btn-secondary text-white">
                    {isViewAll ? "Show Less" : "View All Companies"}
                </button>
            </div>
        </section>
    );
};

export default Companies;