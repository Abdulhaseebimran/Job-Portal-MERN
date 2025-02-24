import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
// import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                {/* <h1 className='font-bold text-xl my-10'>Search Result ({allJobs.length})</h1> */}
                <h1 className='font-bold text-xl my-10'>Search Result</h1>
                <div className='grid grid-cols-3 gap-4'>

                    {/* {
                        allJobs.map((job) => {
                            return (
                                <Job key={job._id} job={job} />
                            )
                        })
                    } */}

                </div>
            </div>
        </div>
    )
}

export default Browse