import React, { useEffect, useState } from "react";
import { firestore } from "../../firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import two from "../assets/two.png";
const TopFive = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        // Reference to the leaderboard collection
        const leaderboardCollectionRef = collection(firestore, "LeaderBoard");

        // Query to get the leaderboard data, ordered by score in descending order
        const leaderboardQuery = query(
          leaderboardCollectionRef,
          orderBy("score", "desc")
          // orderBy("timestamp", "desc")
        );

        // Execute the query and get the snapshot
        const leaderboardSnapshot = await getDocs(leaderboardQuery);

        // Extract the data from the snapshot
        const data = leaderboardSnapshot.docs.map((doc) => doc.data());

        // Update the state with the fetched data
        setLeaderboardData(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    // Call the function to fetch leaderboard data
    fetchLeaderboardData();
  }, []);
  const topFivePlayers = leaderboardData.slice(0, 5);
  console.log(topFivePlayers);
  return (
    <section className="text-black font-bold py-5 mb-10 bg-[#F5F4F4] shadow-lg">
      <div className="md:w-[70%] w-[85%] mx-auto">
        <h1 className=" md:w-[50%] text-center my-5 text-secondary text-[24px]">
          Witness Excellence: Top Performers' Showcase
        </h1>
        <div className="md:flex grid grid-cols-2 justify-between gap-5">
          <div className="mt-10">
            <div className="grid grid-cols-2 text-center gap-10">
              <p>Players</p>
              <p>Scores</p>
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                {topFivePlayers.map((player, index) => (
                  <div
                    className="capitalize grid grid-cols-2 gap-20 my-5"
                    key={index}
                  >
                    <div className="flex gap-4">
                      <p>{index + 1}</p>
                      <p> {player.name}</p>
                    </div>

                    <p>{player.score}</p>
                  </div>
                ))}
              </>
            )}
          </div>
          <img className="mt-[100px] mx-5  md:mt-0" src={two} alt="" />
        </div>
      </div>
    </section>
  );
};

export default TopFive;
