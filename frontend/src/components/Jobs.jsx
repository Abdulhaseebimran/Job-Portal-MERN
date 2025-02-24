import React from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';

const Jobs = () => {
    const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-1 max-w-6xl mx-auto w-full mt-5 px-4">
                {/* Sidebar */}
                <div className="w-1/5 pr-4 border-r border-gray-200">
                    <FilterCard />
                </div>

                {/* Job Listings */}
                <div className="w-4/5 pl-4 overflow-y-auto">
                    {jobsArray.length === 0 ? (
                        <span>Job Not Found</span>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-5">
                            {jobsArray.map((item, index) => (
                                <div key={index}>
                                    <Job />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Jobs;
