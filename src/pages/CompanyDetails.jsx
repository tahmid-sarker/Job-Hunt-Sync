import { use, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { DataContext } from '../context/DataContext';
import { LiaTimesSolid } from "react-icons/lia";
import { BsBookmarkCheck, BsBookmarkCheckFill } from "react-icons/bs";
import { getDataFromLocalStorage, setDataToLocalStorage } from '../utilities/localStorage';

const CompanyDetails = () => {
    const { id } = useParams();
    // console.log(id)
    // console.log(parseInt(id))
    const companies = use(DataContext);
    // console.log(companies)
    const company = companies.find(company => company.id == id);
    const { name, logo, location, website, industry, jobs } = company;

    const [selectedJob, setSelectedJob] = useState(null);
    const closeModal = () => setSelectedJob(null);

    const [bookmarkActive, setBookmarkActive] = useState([])

    //Stored Bookmark Items
    useEffect(() => {
        const storedData = getDataFromLocalStorage();
        setBookmarkActive(storedData)
    }, [])

    //Handle job bookmark
    const handleBookMark = (id, name) => {
        setDataToLocalStorage(id, name)
        setBookmarkActive(prev => (!prev.includes(id) ? [...prev, id] : prev))
    }

    return (
        <section className='w-11/12 mx-auto my-5'>

            {/* Title & Description */}
            <div className='mb-5 space-y-3'>
                <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-700">
                    Explore Opportunities at <span className="text-primary">{name}</span>
                </h1>
                <p className='text-center text-neutral font-semibold'>
                    Discover company insights and browse open positions tailored to your skills and goals.
                </p>
            </div>

            {/* About Company */}
            <div className='mb-5 bg-white shadow-md border border-gray-100 rounded-lg p-5'>
                <h2 className='text-xl md:text-2xl font-semibold text-gray-700 mb-4'>About {name}</h2>
                <div className='flex flex-col md:flex-row items-start gap-3'>
                    <img src={logo} alt={`${name} Logo`} className='w-24 h-24 object-fill' />
                    <div className='space-y-3'>
                        <p><strong>Location:</strong> {location}</p>
                        <p><strong>Industry:</strong> {industry}</p>
                        <p><strong>Website:</strong> <Link to={website} target='_blank' className='text-primary underline'>{website}</Link></p>
                    </div>
                </div>
            </div>

            {/* Jobs Header */}
            <div className='mb-4'>
                <h1 className='text-xl md:text-2xl font-semibold text-gray-700'>Available Job{jobs.length !== 1 ? "s" : ""}:</h1>
                <p className='text-neutral'><span className='text-primary font-semibold'>{jobs.length}</span> Result{jobs.length !== 1 ? "s" : ""} found</p>
            </div>

            {/* Job Cards */}
            <div className='space-y-4'>
                {jobs.map((job, index) => (
                    <div key={index} className='border border-gray-200 rounded-lg p-4 shadow bg-white flex justify-between items-center'>
                        {/* Left Side */}
                        <div>
                            <h2 className='text-lg font-semibold text-gray-700'>{job.title}</h2>
                            <button className="text-primary text-xs font-semibold px-3 py-1 rounded-full border border-secondary">
                                {job.jobType}
                            </button>
                            <p className='text-sm'>{job.salary}</p>
                        </div>
                        {/* Right Side */}
                        <div className='flex items-center gap-3'>
                            <button onClick={() => handleBookMark(job.id, job.title)} className={`text-2xl ${bookmarkActive.includes(job.id) ? "cursor-not-allowed" : "cursor-pointer text-primary hover:text-secondary"} `} title="Bookmark Job">
                                {bookmarkActive.includes(job.id) ? <BsBookmarkCheckFill className='text-primary' /> : <BsBookmarkCheck />}
                            </button>
                            <button onClick={() => setSelectedJob(job)} className='btn btn-primary hover:btn-secondary text-white cursor-pointer'>
                                Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedJob && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-700/40'>
                    <div className='relative bg-white rounded-xl shadow-lg w-11/12 md:w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
                        <button onClick={closeModal} 
                            className='absolute top-3 right-3 z-50 text-gray-700 hover:text-black text-2xl p-1 bg-white rounded-full shadow cursor-pointer'>
                            <LiaTimesSolid />
                        </button>

                        {/* Modal Content */}
                        <img src={selectedJob.bannerImage} alt="Banner" className='w-full h-48 object-content' />
                        <div className='p-6'>
                            <h2 className='text-2xl font-bold mb-2 text-gray-700'>{selectedJob.title}</h2>
                            <div className='text-sm text-gray-500 space-y-2'>
                                <p><strong>Location:</strong> {selectedJob.location}</p>
                                <p><strong>Salary:</strong> {selectedJob.salary}</p>
                                <p><strong>Type:</strong> {selectedJob.jobType}</p>
                            </div>
                            <div className='space-y-2'>
                                <h3 className='text-lg font-semibold text-gray-700'>Job Description:</h3>
                                <p className='text-gray-700'>{selectedJob.description}</p>
                                <h3 className='text-lg font-semibold text-gray-700'>Requirements:</h3>
                                <ul className='list-disc list-inside text-gray-700 space-y-1'>
                                    {selectedJob.requirements.map((req, index) => (<li key={index}>{req}</li>))}
                                </ul>
                                <Link to={website} target="_blank" className='btn btn-primary hover:btn-secondary text-white'>Apply Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default CompanyDetails;