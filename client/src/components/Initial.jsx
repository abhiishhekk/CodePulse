import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import github from "../assets/github.svg"
export default function Initial({setUsername}){
    const [username, setUsern] = useState("");

    return(
        <nav className="md:grid flex flex-col  justify-center gap-2 h-screen md:grid-cols-2 grid-cols-1 w-screen  bg-amber-400 py-2 px-10 fixed z-30">
            {/* <div className="flex items-center">
                <img src={github} alt="github" className="w-[2.5rem]"/>
            </div> */}
            <div className="flex items-center justify-center text-5xl font-serif">
                CODE PULSE
                <span className="relative flex h-3 w-3  ml-3">
                        <span className="btn-ping animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-700 opacity-75"></span>
                        <span className="btn-ping_dot relative inline-flex rounded-full h-3 w-3 bg-black"></span>
                </span>
            </div>
            <div className="absolute left-1/2 top-0 h-full w-[1px] bg-black md:block hidden"></div>
            <div className="flex gap-3 decoration-0 items-center content-center md:ml-14">
                <Input
                placeholder="Enter leetcode username..."
                value={username}
                onChange= {(e)=>setUsern(e.target.value)}
                className={`w-[30rem] bg-accent`}
                
            />
            <Button onClick={()=>setUsername(username)} variant="secondary">Search</Button>
            </div>
        </nav>
    )
}