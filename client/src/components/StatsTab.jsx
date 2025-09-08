import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ContestHistory from "./ContestHistory";
import { Progress } from "@/components/ui/progress"
import { Chart } from "./Chart.jsx";
import { Problems } from "./Problems";
import { useEffect, useState } from "react";

export default function StatsTab({stats, user, contestHistory, contestError, streakData, streakError}){
    if(!stats && !user) return null;

    const [level, setLevel] = useState(true);
    const [easy, setEasy] = useState(false);
    const [medium, setMedium] = useState(false);
    const [hard, setHard] = useState(false);
    // useEffect(()=>{
    //     if(level === "easy"){
    //         setEasy(true);
    //     }
    //     if(level==="medium"){
    //         setMedium(true);
    //     }
    //     if(level === "hard"){
    //         setHard(true);
    //     }
    // }, [level])
    console.log(easy);
    return(
        <Tabs defaultValue="problems" className="w-[50rem] md:w-full max-w-2xl mx-auto felx flex-col ">
            <TabsList className="grid grid-cols-2">
                <TabsTrigger value="problems">
                    Problems
                </TabsTrigger>
                <TabsTrigger value="contests">
                    Contests
                </TabsTrigger>
            </TabsList>

            <TabsContent value="problems" className={``}>
                {/* <Card className={`bg-[#fafafc]`}>
                    <CardContent className="p-4 bg-[#fafafc]">
                        <div className="flex items-center gap-4 justify-between">
                            <p>Easy Solved: {user.easySolved}</p>
                            <Progress value={(user.easySolved/user.totalSolved)*100} className={`md:w-[15rem] w-[10rem]`}/>
                        </div>
                        <div className="flex items-center gap-4 justify-between">
                            <p>Medium Solved: {user.mediumSolved}</p>
                            <Progress value={(user.mediumSolved/user.totalSolved)*100} className={`md:w-[15rem] w-[10rem]`}/>
                        </div>
                        <div className="flex items-center gap-8 justify-between">
                            <p>Hard Solved: {user.hardSolved}</p>
                            <Progress value={(user.hardSolved/user.totalSolved)*100} className={`md:w-[15rem] w-[10rem]`}/>
                        </div>
                    </CardContent>
                </Card> */}
                
                <Card className={`grid grid-cols-2 pl-2`} >
                    {level && <Problems solved={user?.totalSolved} total={user?.totalQuestions} type="total" />}
                    {easy && <Problems solved={user?.easySolved} total={user?.totalEasy} type="Easy"/>}
                    {medium && <Problems solved={user?.mediumSolved} total={user?.totalMedium} type="Medium"/>}
                    {hard && <Problems solved={user?.hardSolved} total={user?.totalHard} type="Hard"/>}
                    <div className="flex flex-col justify-center items-center gap-y-2">
                        <div className="px-3 py-1 flex flex-col justify-center items-center font-serif border-2 rounded-2xl " onMouseEnter={()=>{setEasy(true); setLevel(false)}} onMouseLeave={()=>{setEasy(false); setLevel(true)}} >
                            <p className="text-[#1cbaba]">Easy</p>
                            <p>{user?.easySolved}/{user?.totalEasy}</p>
                        </div>
                        <div className="px-3 py-1 flex flex-col justify-center items-center font-serif border-2  rounded-2xl" onMouseEnter={()=>{setMedium(true); setLevel(false)}} onMouseLeave={()=>{setMedium(false); setLevel(true)}}>
                            <p className="text-[#ffb700]">Medium</p>
                            <p>{user?.mediumSolved}/{user?.totalMedium}</p>
                        </div>
                        <div className="px-3 py-1 flex flex-col justify-center items-center font-serif border-2  rounded-2xl" onMouseEnter={()=>{setHard(true); setLevel(false)}} onMouseLeave={()=>{setHard(false); setLevel(true)}}>
                            <p className="text-[#f63737]">Hard</p>
                            <p>{user?.hardSolved}/{user?.totalHard}</p>
                        </div>
                        <div className="flex gap-2 font-serif">
                            Total Acive Days:
                            {!streakError && <p>
                                {streakData?.totalActiveDays}
                            </p>}
                            {streakError && <p>
                                Not public
                            </p>}
                        </div>
                    </div>

                    
                </Card>
                
            </TabsContent>

            <TabsContent value="contests">
                {!contestError && <Card className={`grid grid-cols-2 bg-[#fafafc]`}>
                    <CardContent className="p-4 flex flex-col gap-2 justify-center">
                        <div className="flex gap-1"><p className="font-serif">Contest Rating:</p>
                            <p>{stats?.contestRating}</p>
                         </div>
                        <div className="flex gap-1"><p>Contests Attended: </p>
                            <p>{stats?.totalContestsAttended}</p>
                        </div>
                        <div className="flex gap-1"><p>Global Contest Rank: </p>
                            <p>{stats?.globalRank}</p>
                        </div>
                        <div className="flex gap-1"><p>Top Percentage: </p>
                            <p>{stats?.topPercentage}</p>
                        </div>
                    </CardContent>
                    <CardContent>
                        <Chart history = {contestHistory}/>
                    </CardContent>
                </Card>}
                {contestError &&

                    <div>No contest details available</div>

                }
                {!contestError && <Card>
                    <CardContent className={`bg-[#fafafc]`}>
                        <ContestHistory history={contestHistory}/>
                    </CardContent>
                </Card>}
            </TabsContent>
        </Tabs>
    )
}