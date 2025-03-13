import React, { useState } from 'react'
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from "../../redux/jobSlice.js";

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const naviagte = useNavigate();
    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query))
        console.log("Query:", query);
        naviagte("/browse");
    }
    return (
        <div className='text-center'>
            <div className="flex flex-col gap-5 my-10">
                <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-red-500 font-medium" >No.1 Job Hunt Website</span>
                <h1 className="text-5xl font-bold">
                    Search, Apply & <br /> Get Your <span className="text-purple-600">Dream Jobs</span>
                </h1>
                <p>
                    Your dream job is waiting—connect with top employers and take the next step in your career.
                </p>
                <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto" >
                    <input type="text" placeholder="Find your dream jobs" onChange={(e) => setQuery(e.target.value)} className="outline-none border-none w-full" />
                    <Button className="rounded-r-full bg-purple-600" onClick={searchJobHandler}>
                        <Search className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection