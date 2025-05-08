import React, { use } from 'react';
import { getDataFromLocalStorage, removeDataFromLocalStorage } from '../utilities/localStorage';
import { DataContext } from '../context/DataContext';
import { Link, useNavigate } from 'react-router';

const SavedJobs = () => {
    const companies = use(DataContext);
    // console.log(companies)
    const navigate = useNavigate();

    const savedJobIds = getDataFromLocalStorage();
    // console.log(savedJobIds)
    const hasSavedJobs = Boolean(savedJobIds.length);
    // console.log(hasSavedJobs)

    const bookmarkedJobs = companies.flatMap(company =>
        company.jobs.filter(job => savedJobIds.includes(job.id))
    );
    // console.log(bookmarkedJobs)

    // Handle job removal
    const handleRemoveJob = (id, name) => {
        removeDataFromLocalStorage(id, name);
        navigate("/saved-jobs");
    };

    return (
        <section className="w-11/12 mx-auto my-5">
            {/* Title & Description */}
            <div className="mb-5 space-y-3">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-700">
                    Your <span className="text-primary">Saved</span> Jobs
                </h1>
                <p className="text-center text-neutral font-semibold">
                    Keep track of jobs you're interested in. Revisit them anytime and apply when you're ready.
                </p>
            </div>

            {hasSavedJobs ? (
                <>
                    {/* Saved Jobs Header */}
                    <div className="mb-4">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700">
                            Available Job{bookmarkedJobs.length !== 1 ? "s" : ""}:
                        </h2>
                        <p className="text-neutral">
                            <span className="text-primary font-semibold">{bookmarkedJobs.length}</span> Result{bookmarkedJobs.length !== 1 ? "s" : ""} found
                        </p>
                    </div>

                    {/* Job Cards */}
                    <div className="space-y-4">
                        {bookmarkedJobs.map((job, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4 shadow bg-white flex justify-between items-center">
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
                                    <button onClick={() => handleRemoveJob(job.id, job.title)} className='btn btn-primary hover:btn-secondary text-white cursor-pointer'>
                                        Remove Job
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="bg-white mt-8 p-6 sm:p-10 rounded-xl text-center shadow-md">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">No Jobs Saved</h1>
                    <hr className="my-4 border-2 border-dashed border-gray-200" />
                    <p className="text-gray-500 text-base mb-6">Looks like you haven't saved any jobs yet.</p>
                    <Link to="/">
                        <button className="btn btn-primary hover:btn-secondary text-white">
                            Find your Job
                        </button>
                    </Link>
                </div>
            )}
        </section>
    );
};

export default SavedJobs;
