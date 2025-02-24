import React from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { USER_API_END_POINT } from '../../../utils/constant'
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading } from '../../../redux/authSlice';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    // const { isLoading, user } = useSelector((state) => state.auth);
    const { isLoading } = useSelector((state) => state.auth);

    const submithandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.message))
                navigate("/");
                console.log(res.data.message.fullName, res.data);
                toast.success(`${res.data.message.fullName} logged in successfully!`);
            }
        } catch (error) {
            console.log(error);
            const message = error.response?.data?.message;
            const errorMessage = typeof message === 'string'
                ? message
                : String(message) || "Something went wrong!";
            toast.error(errorMessage);
            console.log(toast.error(errorMessage));

        } finally {
            // dispatch(setLoading(false))
        }
    }

    // useEffect(() => {
    //     if (user) {
    //         navigate("/")
    //     }
    // })
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form className='w-1/2 border border-gray-400 rounded-md p-4 my-10' onSubmit={submithandler}>
                    <h1 className='text-xl font-bold mb-5'>Login</h1>
                    <div className='my-5'>
                        <Label className='mb-2 block'>Email</Label>
                        <Input type="email" name="email" placeholder='Enter your email' onChange={changeEventHandler} value={input.email} />
                    </div>
                    <div className='my-5'>
                        <Label className='mb-2 block'>Password</Label>
                        <Input type="password" name="password" placeholder='Enter your password' onChange={changeEventHandler} value={input.password} />
                    </div>
                    <div className="flex items-center justify-between mt-5">
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    className="cursor-pointer"
                                    onChange={changeEventHandler}
                                    checked={input.role == "student"}
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    className="cursor-pointer"
                                    onChange={changeEventHandler}
                                    checked={input.role == "recruiter"}
                                />
                                <Label htmlFor="rr">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {
                        isLoading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait</Button> : <Button type="submit" className="w-full my-4 bg-blue-800 text-white">Login</Button>
                    }
                    <span className="text-sm">
                        Don't have an account ?{" "}
                        <Link to="/signup" className="text-blue-800 text-sm">
                            Signup
                        </Link>
                    </span>
                </form>
            </div>
        </div>

    )
}

export default Login