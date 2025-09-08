import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function UserCard({ user }) {
    if (!user) return null;

    return (
        <Card className={`md:h-[40rem] h-[33rem] bg-[#fafafc] md:ml-6`}>
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
            <CardContent className={`flex justify-between gap-2`}>
                <div className="flex gap-2">
                    <div className="flex gap-1 font-bold flex-col border-2 p-2 rounded-2xl">
                        <p className="text-xl opacity-65">Solved: </p>
                        <p className="text-xl">{user.totalSolved}</p>
                    </div>
                    <div className="flex gap-1 font-bold flex-col border-2 p-2 rounded-2xl">
                        <p className="text-xl opacity-65">Global Rank: </p>
                        <p className="text-xl">{user.ranking}</p>
                    </div>
                    <div className="flex gap-1 font-bold flex-col border-2 p-2 rounded-2xl">
                        <p className="text-xl opacity-65">Total Badges: </p>
                        <p className="text-xl">{user.badges.length}</p>
                    </div>
                    {/* <p className="text-xl font-semibold"> </p>
                    <p className="text-xl font-medium"> </p> */}
                </div>
                <div className="text-xl font-medium">
                    <p>Leetcode coins: {user.leetcodeCoins}</p>
                </div>
            </CardContent>
            <CardContent className={`flex gap-1`}>
                <p className={`text-4xl opacity-65 font-serif font-medium`}>
                    Annual
                </p>
                <p className="text-3xl font-serif pt-1">
                    Badges
                </p>
            </CardContent>
            <CardContent className={`grid md:grid-cols-5 grid-cols-4 gap-4`}>
                {
                    user.badges.filter((b) => b.icon?.startsWith("https")).map((b, index) => (
                        <Avatar key={index} className={`h-[4rem] w-[4rem]`}>
                            <AvatarImage src={b.icon} alt={b.displayName} />
                            <AvatarFallback>{b.displayName}</AvatarFallback>

                        </Avatar>
                    ))
                }

            </CardContent>
        </Card>
    )
}