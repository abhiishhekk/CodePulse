import { useState, useEffect } from "react";
import api from "@/lib/utils/api";

import UserCard from "./UserCard";
import SearchBar from "./SearchBar";
import StatsTab from "./StatsTab";
import { SyncLoader } from "react-spinners";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import Initial from "./Initial";
import ContestHistory from "./ContestHistory";
export default function Home() {
  const [user, setUser] = useState(null);
  const [stats, setContestStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rankingHistory, setRankingHistory] = useState([]);
  const [searched, setSearched] = useState(false);
  const [username, setUsername] = useState("");
  const [streakData, setStreakData] = useState(null);
  const [streakError, setStreakError] = useState("");
  const [contestError, setContestError] = useState("");
  // async function fetchUser(username){
  //     try {
  //         setSearched(true);
  //         setLoading(true);
  //         setError("");

  //         const {data: userData} = await api.get(`/user/${username}`);
  //         setUser(userData);

  //         const {data: contestData} = await api.get(`/user/${username}/contest`);
  //         setContestStats(contestData);
  //         setRankingHistory(contestData.contestRankingHistory);
  //       // console.log(rankingHistory);
  //     } catch (error) {
  //         setError("Failed to fetch user data. Please try again or check username.");
  //     }
  //     finally{
  //         setLoading(false);
  //     }
  // }
  // 2. useEffect to handle the fetching logic
  useEffect(() => {
    // Don't fetch if the username is empty
    if (!username) {
      return;
    }

    // AbortController cancels the previous request if a new one starts
    const controller = new AbortController();

    async function fetchData() {
      try {
        setSearched(true);
        setLoading(true);
        setError("");
        setUser(null); // Also a good idea to clear old data
        setContestStats(null);
        setContestError("");
        setStreakError("");

        const { data: userData } = await api.get(`/user/${username}`, {
          signal: controller.signal, // Pass the signal to the request
        });
        setUser(userData);
        // console.log(userData);
        try {
          const { data: contestData } = await api.get(`/user/${username}/contest`, {
            signal: controller.signal,
          });
          setContestStats(contestData);
          // console.log(stats?.contestBadge)
          setRankingHistory(contestData.contestRankingHistory);
          // console.log(contestData.contestBadge.name);
        } catch (contestApiError) {
          console.error("Failed to fetch contest data:", contestApiError);
          setContestError("Could not load Contest data.");
        }
        try {
          const { data: streakDataResponse } = await api.get(`/user/${username}/streak`);
          setStreakData(streakDataResponse);
        } catch (streakApiError) {
          console.error("Failed to fetch streak data:", streakApiError);
          setStreakError("Could not load streak data."); // Set a specific error for the streak
        }
      } catch (error) {
        if (error.name === 'CanceledError') {
          // This isn't a real error, just the request being canceled.
          // We can ignore it.
          console.log("Request aborted");
        } else {
          setError("Failed to fetch user data. Please try again or check username.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    // 3. The cleanup function
    return () => {
      controller.abort();
    };
  }, [username]); // This effect re-runs whenever the 'username' changes
  // console.log("contest stats is here" ,stats?.contestBadge);
  return (
    <div>
      {!searched && <div>
        <Initial setUsername={setUsername} />
      </div>
      }
      {<div className="relative">
        <SearchBar setUsername={setUsername} />

        {loading && <div className="h-screen w-screen flex justify-center content-center z-10 absolute">
          <SyncLoader size={24} className="items-center content-center" />
        </div>}
        {error && <div className=" mx-auto h-[40rem] flex items-center content-center">
          <Alert variant="destructive" className={`flex flex-col items-center content-center`}>
            {/* <AlertCircle className="h-4 w-4" /> */}
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
        }


        <div className="grid lg:grid-cols-2 gap-2 pt-20">
          {!error && !loading && <UserCard user={user} streakData={streakData} streakError={streakError} badge={stats?.contestBadge} />}
          {!error && !loading && <StatsTab stats={stats} user={user} contestHistory={rankingHistory} contestError={contestError} streakData={streakData} streakError={streakError} />}
        </div>
      </div>}
    </div>
  );
}