import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { User2, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [user, setUser] = useState(false);
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-6xl h-16'>
                <div>
                    <h1 className="text-2xl font-bold">
                        Job<span className="text-red-600">Portal</span>
                    </h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        <li>Home</li>
                        <li>About</li>
                        <li>Contact</li>
                    </ul>
                    {
                        !user ? (
                            <div className="flex itmes-center gap-2">
                                <Link to="/login">
                                <Button variant="outline">Login</Button>
                                </Link>
                                <Link to="/signup">
                                <Button className="bg-purple-600 hover:bg-purple-700">
                                    Signup
                                </Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className='rounded-full cursor-pointer'>
                                        <AvatarImage src='https://github.com/shadcn.png' />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className='w-88'>
                                    <div className='flex gap-2 space-y-2 items-center'>
                                        <Avatar className='rounded-full cursor-pointer'>
                                            <AvatarImage src='https://github.com/shadcn.png' />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>John Doe</h4>
                                            <p className='text-sm text-muted-foreground'>
                                                john@doe.com
                                            </p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col text-gray-600'>
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <User2 />
                                            <Button variant='link' className='w-full justify-start'>View Profile</Button>
                                        </div>
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <LogOut />
                                            <Button variant='link' className='w-full justify-start'>Logout</Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </div>

    )
}

export default Navbar