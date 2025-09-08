import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import github from "../assets/github.svg"
export default function SearchBar({setUsername}){
    const [username, setUsern] = useState("");

    return(
        <nav className="grid gap-2 md:grid-cols-3 grid-cols-2 md:w-screen w-auto bg-amber-400 py-2 px-10 fixed z-20">
            <div className="flex items-center">
                <a href="https://github.com/abhiishhekk/CodePulse" target="_blank" rel="noopener noreferrer">
                    <img src={github} alt="github" className="w-[2.5rem]"/>
                </a>
            </div>
            <div className="md:block hidden">

            </div>
            <div className="flex gap-3 decoration-0">
                <Input
                placeholder="Enter leetcode username..."
                value={username}
                onChange= {(e)=>setUsern(e.target.value)}
                
            />
            <Button onClick={()=>setUsername(username)}>Search</Button>
            </div>
        </nav>
    )
}