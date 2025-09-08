import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Knight from "../assets/Knight.gif"
import Guardian from "../assets/Guardian.gif"
export default function UserCard({ user, streakData, streakError, badge }) {
    if (!user) return null;
    console.log()
    return (
        <Card className={`md:min-h-[40rem] min-h-[33rem] bg-[#fafafc] md:ml-6`}>
            <CardHeader className={`flex  gap-5 justify-between flex-row-reverse items-center`}>
                <Avatar className={`h-20 w-20`}>
                    <img src={user.avatar} alt={user.username} className="" />
                </Avatar>
                <CardTitle className={`flex gap-2`}>
                    <div className="flex gap-1 border-2 p-5 flex-col justify-center items-start rounded-2xl">
                        <div className="opacity-65 font-serif font-medium">
                            Username:
                        </div>
                        <div className=" font-serif pt-1">
                            {user.username}
                        </div>
                    </div>
                    <div className="flex gap-1 border-2 p-5 flex-col justify-center items-start rounded-2xl">
                        <div className="opacity-65 font-serif font-normal">
                            Name:
                        </div>
                        <div className="font-serif pt-1">
                            {user.realname}
                        </div>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className={`flex justify-between gap-2 flex-row overflow-scroll`}>
                <div className="flex gap-2">
                    <div className="flex gap-1 font-bold flex-col border-2 p-2 rounded-2xl">
                        <p className="text-lg opacity-65">Solved: </p>
                        <p className="text-lg">{user.totalSolved}</p>
                    </div>
                    <div className="flex gap-1 font-bold flex-col border-2 p-2 rounded-2xl">
                        <p className="text-lg opacity-65">Global Rank: </p>
                        <p className="text-lg ">{user.ranking}</p>
                    </div>
                    <div className="flex gap-1 font-bold flex-col border-2 p-2 rounded-2xl">
                        <p className="text-lg opacity-65">Total Badges: </p>
                        <p className="text-lg ">{user.badges.length}</p>
                    </div>
                    {/* <p className="text-xl font-semibold"> </p>
                    <p className="text-xl font-medium"> </p> */}
                    <div className="flex gap-1 font-bold flex-col border-2 p-2 rounded-2xl">
                        {/* <p className="text-xl">Leetcode coins: {user.leetcodeCoins}</p> */}
                        <p className="text-lg opacity-65">Max. Streak: </p>
                        {!streakError && <p className="text-lg ">{streakData.maxStreak} days</p>
                            
                        }
                        {streakError && <p className="text-lg "> Not Public</p>}

                    </div>
                    <div className="flex gap-1 font-bold flex-col border-2 p-2 rounded-2xl">
                        {/* <p className="text-xl">Leetcode coins: {user.leetcodeCoins}</p> */}
                        <p className="text-xl opacity-65">Leetcode coins: </p>
                        <p className="text-xl">{user.leetcodeCoins}</p>
                    </div>
                </div>
                {/* <div className="text-xl font-medium">
                    <p>Leetcode coins: {user.leetcodeCoins}</p>
                </div> */}
            </CardContent>
            {(badge ==="Knight" || badge==="Guardian") && 
                <CardContent className={`flex gap-1`}>
                    <p className={`text-4xl opacity-65 font-serif font-medium`}>
                        Contest
                    </p>
                    <p className="text-3xl font-serif pt-1">
                        Badge
                    </p>

                </CardContent>
                
            }
            <CardContent className={`grid md:grid-cols-5 grid-cols-4 gap-4`}>
                { badge === "Knight" &&
                    <div className="flex flex-col items-center"><Avatar  className={`h-[4rem] w-[4rem]`}>
                            <AvatarImage src={Knight} alt="Knight" />
                            <AvatarFallback>Knight</AvatarFallback>
                            
                            </Avatar>
                    <p className="font-serif">Knight</p>
                    </div>
                }
                { badge === "Guardian" &&
                    <div className="flex flex-col items-center">
                        <Avatar  className={`h-[4rem] w-[4rem]`}>
                            <AvatarImage src={Guardian} alt="Guardian" />
                            <AvatarFallback>Guardian</AvatarFallback>
                        </Avatar>
                        <p className="font-serif">Guardian</p>
                    </div>
                }
            </CardContent>
            
            {user.badges.filter((b) => b.icon?.startsWith("https")).length>0 && <CardContent className={`flex gap-1`}>
                <p className={`text-4xl opacity-65 font-serif font-medium`}>
                    Annual
                </p>
                <p className="text-3xl font-serif pt-1">
                    Badges
                </p>
            </CardContent>}
            <CardContent className={`grid md:grid-cols-5 grid-cols-4 gap-4`}>
                {
                    user.badges.filter((b) => b.icon?.startsWith("https")).map((b, index) => (
                        <div className="flex flex-col items-center">
                            <Avatar key={index} className={`h-[3.5rem] w-[3.5rem]`}>
                            <AvatarImage src={b.icon} alt={b.displayName} />
                            <AvatarFallback>{b.displayName}</AvatarFallback>
                            </Avatar>
                            <p className="font-serif text-center">{b.displayName}</p>
                        </div>
                    ))
                }

            </CardContent>
            
        </Card>
    )
}