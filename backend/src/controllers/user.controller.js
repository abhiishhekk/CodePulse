import lc from '../utils/leetcode.js'

export const getUserProfile = async (req, res)=>{
    try {
        const {username}  = req.params;
        // console.log(username);

        const user = await lc.user(username);

        if(!user){
            return res.status(404)
            .json({error: "failed to get user"})
        }
        // console.log(user.matchedUser);
        // console.log("total QUESTION COUNT", user.matchedUser.submitStats.totalSubmissionNum);
        // console.log("ac submission", user.matchedUser.submitStats.acSubmissionNum.find((d)=>d.difficulty==="Medium"));
        const solved = user.matchedUser.submitStats.acSubmissionNum.find(
            (d) => d.difficulty === "All"
        )?.count;

        res.json({
            username: user.matchedUser.username,
            realname: user.matchedUser.profile.realName,
            leetcodeCoins:user.matchedUser.contributions.points,
            avatar:user.matchedUser.profile.userAvatar,
            totalSolved: solved,
            ranking: user.matchedUser.profile.ranking,
            easySolved: user.matchedUser.submitStats.acSubmissionNum.find((d)=>d.difficulty === "Easy")?.count,
            mediumSolved: user.matchedUser.submitStats.acSubmissionNum.find((d)=>d.difficulty === "Medium")?.count,
            hardSolved: user.matchedUser.submitStats.acSubmissionNum.find((d)=>d.difficulty === "Hard")?.count,
            totalEasy:user.allQuestionsCount.find((d)=>d.difficulty==="Easy")?.count,
            totalMedium:user.allQuestionsCount.find((d)=>d.difficulty==="Medium")?.count,
            totalHard:user.allQuestionsCount.find((d)=>d.difficulty==="Hard")?.count,
            badges:user.matchedUser.badges,
            totalQuestions:user.allQuestionsCount.find((d)=>d.difficulty==="All")?.count,
        })
    } catch (error) {
        console.log("error in getting user profile", error);
        res.status(500)
        .json({error: "failed to fetch user details"});
    }
};

export const getUserContest = async (req, res) => {
    try {
        const {username} = req.params;
        // console.log(username);
        const contest = await lc.user_contest_info(username);
        // console.log(contest.userContestRanking);
        res.json({
            contestRating: contest.userContestRanking?.rating,
            totalContestsAttended: contest.userContestRanking?.attendedContestsCount,
            globalRank: contest.userContestRanking?.globalRanking,
            topPercentage: contest.userContestRanking?.topPercentage,
            contestRankingHistory:contest.userContestRankingHistory.filter((c)=>c.attended===true).slice(-10).reverse(),
            totalContests:contest.userContestRankingHistory?.length,
            contestBadge:contest.userContestRanking.badge?.name,
        });
        // console.log(res.json(contest));
    } catch (error) {
        console.log("error in getting User Contest", error);
        res.status(500)
        .json({error:"failed to fetch user contest data"});
    }
};
