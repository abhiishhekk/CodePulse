import axios from 'axios'
// import lc from '../utils/leetcode';

export const getUserStreak = async (req, res) => {
    try {
        const { username } = req.params;
        const graphqlQuery = {
            query: `query userProfileCalendar($username: String!, $year: Int) {
    matchedUser(username: $username) {
      userCalendar(year: $year) {
        activeYears
        streak
        totalActiveDays
        dccBadges {
        timestamp
        badge {
          name
          icon
        }
      }
        submissionCalendar
      }
    }
  }`,
            variables: {
                "username": username
            }
        };

        const response = await axios.post('https://leetcode.com/graphql', graphqlQuery, {
            headers: {
                'Content-Type': 'application/json',
                // LeetCode's API may require a referer header
                'Referer': 'https://leetcode.com/'
            }
        })

        const userCalendar = response.data.data.matchedUser.userCalendar;
        // console.log(userCalendar);
        if (!userCalendar) {
            return res.status(404).json({
                success: false,
                message: `User '${username}' not found on LeetCode.`
            });
        }
        res.json({
            maxStreak: userCalendar.streak,
            totalActiveDays: userCalendar.totalActiveDays,
            activeYears: userCalendar.activeYears,
            // dccBadges: userCalendar.dccBadges,
        })

    } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        res.status(500).json({
            success: false,
            message: "Failed to fetch LeetCode data."
        });
    }
}