import { motion } from "motion/react"

const Testimonials = () => {
    const CardDetails = [
        {
            name: "Touhidur Rahman",
            username: "@touhidurrahman",
            image: "https://i.ibb.co.com/MyHC7BVm/user.jpg",
            review: "Job Hunt Sync helped me land a remote job in just a week. The clean UI made my search fast and stress-free."
        },
        {
            name: "Samira Khan",
            username: "@samirakhan",
            image: "https://i.ibb.co.com/MyHC7BVm/user.jpg",
            review: "This site feels thoughtfully built—smooth, modern, and easy to navigate. I actually enjoy using it."
        },
        {
            name: "Anik Talukder",
            username: "@aniktalukder",
            image: "https://i.ibb.co.com/MyHC7BVm/user.jpg",
            review: "As a fresh grad, I felt overwhelmed. Job Hunt Sync made it simple to find roles I could apply for with confidence."
        },
        {
            name: "Rakib Mahmud",
            username: "@rakibmahmud",
            image: "https://i.ibb.co.com/MyHC7BVm/user.jpg",
            review: "Finally, a job platform that works for real people. Secure, clear, and focused on what matters."
        },
    ];

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2,
                duration: 0.6
            }
        })
    };

    return (
        <section className='w-11/12 mx-auto my-5'>
            <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-700 mb-5">
                What Our <span className="text-primary">Users</span> Are Saying
            </h1>

            <div className="grid md:grid-cols-2 gap-6">
                {CardDetails.map((card, index) => (
                    <motion.div key={index} className="bg-white shadow-md rounded-xl p-4 text-start"
                        custom={index} initial="hidden" whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }} variants={cardVariants}>
                        <p className="text-gray-700 mb-4 text-sm md:text-base">“{card.review}”</p>

                        <div className="flex items-center gap-3">
                            <img src={card.image} alt={card.name} className="w-12 h-12 rounded-full object-cover" />
                            <div className="flex flex-col">
                                <span className="text-gray-700 font-semibold text-sm">{card.name}</span>
                                <span className="text-gray-500 text-xs">{card.username}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;